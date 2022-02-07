import 'reflect-metadata'
import { decorate, injectable} from 'inversify'
import { Container } from 'unstated'


decorate(injectable(), Container)