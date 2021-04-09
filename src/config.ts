import { SynchronizedConfiguration } from './types'

export class ConfigManager {
    constructor(public config: SynchronizedConfiguration) {}

    public update(config: SynchronizedConfiguration) {
        this.config = config
    }
}
