import * as ts from 'typescript/lib/tsserverlibrary'
import * as minimatch from 'minimatch'
import { ConfigManager } from './config'
import { LanguageServiceLogger } from './logger'
import { SynchronizedConfiguration } from './types'

export class ReactGoToDefinitionPlugin {
  public constructor(private readonly typescript: typeof ts) { }

  private logger?: LanguageServiceLogger
  private configManager?: ConfigManager

  public create(info: ts.server.PluginCreateInfo): ts.LanguageService {
    const config: SynchronizedConfiguration = info.config ?? {}
    this.logger = new LanguageServiceLogger(info)
    this.configManager = new ConfigManager(config)
    this.logger.log('create config: ' + JSON.stringify(config))

    // const whatToRemove: string[] = info.config.remove || ['**/node_modules/@types/react/index.d.ts']
    const proxy: ts.LanguageService = Object.create(null)
    for (const k of Object.keys(info.languageService) as Array<keyof ts.LanguageService>) {
      const x = info.languageService[k]
      // @ts-ignore
      proxy[k] = (...args: Array<{}>) => x.apply(info.languageService, args)
    }
    proxy.getDefinitionAndBoundSpan = (filename: string, position: number) => {
      const prior = info.languageService.getDefinitionAndBoundSpan(filename, position)
      if (this.configManager) {
        const defaultRemove = ['**/node_modules/@types/react/index.d.ts']
        const whatToRemove = this.configManager.config.remove || defaultRemove
        if (prior && prior.definitions && prior.definitions.length > 1) {
          const definitions = prior.definitions.filter(x => {
            return !whatToRemove.find(item => minimatch(x.fileName, item))
          })
          info.project.projectService.logger.info('xxx: ' + JSON.stringify(whatToRemove))
          return { ...prior, definitions }
        }
      }
      return prior
    }
    return proxy
  }

  public onConfigurationChanged(config: SynchronizedConfiguration) {
    this.logger?.log('update config: ' + JSON.stringify(config))
    this.configManager?.update(config)
  }
}
