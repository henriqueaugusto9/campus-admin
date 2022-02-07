import { resolve } from 'inversify-react';
import React from "react";
import { Body, Header } from "../../components";
import { AppRepository } from "../../repositories/AppRepository";

class ImagesScene extends React.Component {

    @resolve(AppRepository) private appRepo!: AppRepository

    render() {
        return <>
            <Header
                title={'Imagens'}
                canGoBack={true}
            />
            <Body style={{ height: '100%'}}>
                {
                    this.appRepo.images.map((image: any) => (
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginBottom: 32
                        }}>
                            <img src={image.image} height={200} width={'100%'} />
                            <h2>{image.title}</h2>
                        </div>
                    ))
                }
            </Body>
        </>
    }

}

export default ImagesScene