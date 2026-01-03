export const buildIncomingLinks = async () => {
  const pages = await Page.find({}, { url: 1, outgoingLinks: 1 });

  const incomingMap = {};

  pages.forEach((page) => {
    page.outgoingLinks.forEach((linkObj) => {
      const target = linkObj.url?.trim();
      if (!target) return;

      if (!incomingMap[target]) incomingMap[target] = [];
      incomingMap[target].push(page.url);
    });
  });

  for (const url in incomingMap) {
    await Page.updateOne(
      { url },
      { $addToSet: { incomingLinks: { $each: incomingMap[url] } } },
      { upsert: true }
    );
  }
};
