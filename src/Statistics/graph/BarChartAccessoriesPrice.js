import React from 'react';
import * as utils from '../statisticsUtils';
import { VictoryBar, VictoryChart, VictoryAxis, } from "victory-native";

export default function BarChartAccessoriesPrice() {


    var AccessoriesTypePrice = [
        { type: 'bag', price: utils.getPrice(utils.getTypeList(utils.accessories, 'bag')) },
        { type: 'head', price: utils.getPrice(utils.getTypeList(utils.accessories, 'head')) },
        { type: 'other', price: utils.getPrice(utils.getTypeList(utils.accessories, 'other')) },

    ]


    return (
        <VictoryChart>
            <VictoryBar
                animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 },
                    easing: "bounce"
                }}
                domainPadding={{ x: [60, 60] }}
                alignment="middle"
                barRatio={0.6}
                style={{ data: { fill: 'tomato' } }}
                data={AccessoriesTypePrice} x={'type'} y={'price'}
            />

            <VictoryAxis crossAxis

                domain={[0.1, 0.5]}
            />
            <VictoryAxis dependentAxis crossAxis

                offsetX={70}
                tickFormat={(data) => (`${data / 10000}만원`)}
            />

        </VictoryChart>
    )

}