import { Bristol } from 'bristol'
import palin from 'palin'

const logger = new Bristol()
logger.addTarget('console').withFormatter(palin, {
  rootFolderName: 'koa-es7-boilerplate' // Edit this to match your actual foldername
})

export default logger
