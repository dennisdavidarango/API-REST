module.exports = {
  port: process.env.PORT || 3001,
  //db: process.env.MONGODB_URI || 'mongodb://localhost:27017/shop',
  db: process.eventNames.MONGO_URI || 'mongodb://dennisdavid:Arango12.@api-shop-shard-00-00.cxsyl.mongodb.net:27017,api-shop-shard-00-01.cxsyl.mongodb.net:27017,api-shop-shard-00-02.cxsyl.mongodb.net:27017/shop?ssl=true&replicaSet=atlas-ki378n-shard-0&authSource=admin&retryWrites=true&w=majority',
  SECRET_TOKEN: 'miclavedetokens'
}
