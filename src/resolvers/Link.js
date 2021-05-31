function postedBy(parent, args, context) {
  return context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy();
}

function urlShort(parent, args, context) {
  return new URL(parent.url).hostname;
}

function votes(parent, args, context) {
  return context.prisma.link.findUnique({ where: { id: parent.id } }).votes();
}

module.exports = {
  postedBy,
  urlShort,
  votes,
};
