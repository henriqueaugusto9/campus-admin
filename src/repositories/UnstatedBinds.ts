import { ContainerModule } from 'inversify'
import { Container as UnstatedContainer } from 'unstated'
import { StudentRepository } from './StudentRepository'

export const UNSTATED_CONTAINERS = Symbol('UNSTATED_CONTAINERS')

export const UnstatedBindsModule = new ContainerModule((bind) => {
    bind<UnstatedContainer<any>[]>(UNSTATED_CONTAINERS)
        .toDynamicValue((context) => {
            return [
                context.container.get(StudentRepository)
            ]
        })
        .inSingletonScope()
})