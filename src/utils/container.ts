import { Container } from 'inversify'
import { RepositoriesModule } from '../repositories/module'
import { UnstatedBindsModule } from '../repositories/UnstatedBinds'
import { ServicesModule } from '../services/module'

const UnsignedMonitoriaContainer = new Container()

UnsignedMonitoriaContainer.load(RepositoriesModule)
UnsignedMonitoriaContainer.load(ServicesModule)
UnsignedMonitoriaContainer.load(UnstatedBindsModule)

const MonitoriaContainer: Container & {
    readonly _SIGNING: symbol
} = UnsignedMonitoriaContainer as any

const SIGNING = Symbol('MCONTAINER');
(MonitoriaContainer as any)._SIGNING = SIGNING // To be sure there's only a valid MonitoriaContainer

export function verifySignature(toTest: any) {
    return toTest instanceof Container && (toTest as IMonitoriaContainer)._SIGNING === SIGNING
}

export type IMonitoriaContainer = typeof MonitoriaContainer

export default MonitoriaContainer