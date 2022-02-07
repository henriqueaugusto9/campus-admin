import React from 'react'
import { Container, Subscribe } from 'unstated'
import { Body, CardComponent } from '../components'

export class SubscriptionExpired extends Container<{ isExpired: boolean }> {

    private static INSTANCE = new SubscriptionExpired()

    static readonly Component: React.FC = () => {
        return <Subscribe to={[SubscriptionExpired.INSTANCE]}>
            {(service: SubscriptionExpired) => {
                return <>
                    {service.state.isExpired &&
                        <CardComponent style={{ textAlign: 'center', backgroundColor: '#F7F7F7' }}>

                            <h3>Assinatura expirada</h3>
                            <div style={{ justifyContent: 'center', padding: '16px 0' }}>
                                <img width={72} height={72} src={'https://www.pngitem.com/pimgs/m/17-178490_rich-thinking-emoji-thinking-face-emoji-transparent-background.png'} alt="curious emoji" />
                            </div>
                            <p>Entre em contato pelo whatsapp para renovação do plano.</p>
                        </CardComponent>
                    }
                </>
            }}
        </Subscribe>
    }

    static setIsExpired(isExpired: boolean): Promise<boolean> {
        const service = SubscriptionExpired.INSTANCE
        return service
            .setState({
                isExpired,
            })
            .then(() => isExpired)
    }

    static isExpired() {
        return SubscriptionExpired.INSTANCE.state.isExpired
    }

    private constructor() {
        super()
        this.state = {
            isExpired: true,
        }
    }

}

export default SubscriptionExpired
