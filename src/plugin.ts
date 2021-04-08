import * as ts from 'typescript/lib/tsserverlibrary'
import * as minimatch from 'minimatch'

export class ReactGoToDefinitionPlugin {
  public constructor(
    private readonly typescript: typeof ts
  ) { }

  public create(info: ts.server.PluginCreateInfo): ts.LanguageService {
    const whatToRemove: string[] = info.config.remove || ['**/node_modules/@types/react/index.d.ts']
    const proxy: ts.LanguageService = Object.create(null)
    for (const k of Object.keys(info.languageService) as Array<keyof ts.LanguageService>) {
      const x = info.languageService[k]
      // @ts-ignore
      proxy[k] = (...args: Array<{}>) => x.apply(info.languageService, args)
    }
    proxy.getDefinitionAndBoundSpan = (filename: string, position: number) => {
      const prior = info.languageService.getDefinitionAndBoundSpan(filename, position)
      if (prior && prior.definitions && prior.definitions.length > 1) {
        const definitions = prior.definitions.filter(x => {
          return !whatToRemove.find(item => minimatch(x.fileName, item))
        })
        // info.project.projectService.logger.info('xxx: ' + JSON.stringify(whatToRemove))
        return { ...prior, definitions }
      }
      return prior
    }
    return proxy
  }
}
