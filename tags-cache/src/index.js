"use strict";

const { MongoClient } = require("mongodb");
const moment = require("moment");
const log = require("gitpunch-lib/log").default;
const githubAtom = require("gitpunch-lib");
const getRecentlyReleasedRepos = require("./getRecentlyReleasedRepos").default;
const TagsCache = require("./tagsCache").default;

let {
  MONGODB_URL = "mongodb://localhost:27017/gitpunch",
  GITHUB_FETCH_LIMIT = 50,
} = process.env;
GITHUB_FETCH_LIMIT = +GITHUB_FETCH_LIMIT;

module.exports.handler = async function handler(event, context, callback) {
  let client;
  githubAtom.trackTotalRequests();
  try {
    client = await MongoClient.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const tagsCache = new TagsCache(client);
    await tagsCache.loadAll();

    const watchedReposCursor = client
      .db()
      .collection("users")
      .aggregate([
        { $match: { watching: true } },
        { $unwind: "$repos" },
        { $group: { _id: "$repos" } },
      ]);

    const releasedAll = await getRecentlyReleasedRepos();
    const released = [];

    const then = moment();
    while (await watchedReposCursor.hasNext()) {
      const watchedRepo = await watchedReposCursor.next().then((i) => i._id);
      tagsCache.addWatchedRepo(watchedRepo);
      releasedAll.includes(watchedRepo) && released.push(watchedRepo);
    }
    await tagsCache.updateWatched();
    log("watchedReposCursor", { duration: moment().diff(then, "ms") });

    // load repos which tags haven't been loaded for a while
    const outdated = await tagsCache.loadOutdated(
      GITHUB_FETCH_LIMIT - released.length
    );

    // iterate over recently released and outdated repos and update their latest tag in tagsCache
    for (let name of [...released, ...outdated]) {
      const latestTag = await getLatestTag(name);
      await tagsCache.updateLatestTag(name, latestTag);
      log("latestTag", { repo: name, latestTag });
    }
  } catch (e) {
    log("error", { error: { message: e.message, stack: e.stack } });
  }
  client && client.close();
  githubAtom.closeConnections();
  githubAtom.logTotalRequests();
  callback();
};

function getLatestTag(name) {
  return githubAtom
    .fetchTags(name)
    .then((t) => t[0].name)
    .catch(() => "");
}
