import * as ts from 'typescript/lib/tsserverlibrary'
import * as minimatch from 'minimatch'
import { ConfigManager } from './config'
import { LanguageServiceLogger } from './logger'
import { SynchronizedConfiguration, Rule } from './types'

export class ReactGoToDefinitionPlugin {
  public constructor(private readonly typescript: typeof ts) { }

  private logger?: LanguageServiceLogger
  private configManager?: ConfigManager

  public create(info: ts.server.PluginCreateInfo): ts.LanguageService {
    const config: SynchronizedConfiguration = info.config ?? {}
    this.logger = new LanguageServiceLogger(info)
    this.configManager = new ConfigManager(config)
    this.logger.log('create config: ' + JSON.stringify(config))

    const proxy: ts.LanguageService = Object.create(null)
    for (const k of Object.keys(info.languageService) as Array<keyof ts.LanguageService>) {
      const x = info.languageService[k]
      // @ts-ignore
      proxy[k] = (...args: Array<{}>) => x.apply(info.languageService, args)
    }

    proxy.getDefinitionAndBoundSpan = (filename: string, position: number) => {
      const prior = info.languageService.getDefinitionAndBoundSpan(filename, position)
      if (!this.configManager || !this.logger || !prior || !prior.definitions) {
        return prior
      }
      const defaultRemove = ['**/node_modules/@types/react/index.d.ts']
      const whatToRemove = this.configManager.config.remove || defaultRemove
      const forceRemove = this.configManager.config.forceRemove || []
      let definitions = this.filter(prior.definitions, forceRemove, filename)
      if (definitions.length > 1) {
        definitions = this.filter(definitions, whatToRemove, filename)
      }
      return { ...prior, definitions }
    }
    return proxy
  }

  private filter(definitions: readonly ts.DefinitionInfo[], rules: Rule[], sourceFileName: string) {
    return definitions.filter(definition => !rules.find(rule => {
      if (typeof rule === 'string') {
        return minimatch(definition.fileName, rule)
      }
      if (minimatch(sourceFileName, rule.file)) {
        return minimatch(definition.fileName, rule.definition)
      }
      return false
    }))
  }

  public onConfigurationChanged(config: SynchronizedConfiguration) {
    this.logger?.log('update config: ' + JSON.stringify(config))
    this.configManager?.update(config)
  }
}
