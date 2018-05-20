import React, { Component } from 'react'
import { View } from 'react-native'
import { COLOR } from 'react-native-material-ui'
import styles from './styles'
import { LineChart } from 'react-native-svg-charts'
import { Circle, Path } from 'react-native-svg'

const Decorator = ({ x, y, data }) => {
  return data.map((value, index) => (
    <Circle
      key={ index }
      cx={ x(index) }
      cy={ y(value) }
      r={ 2 }
      stroke={ COLOR.white }
      fill={ COLOR.white }
    />
  ))
}

const Shadow = ({ line }) => (
  <Path
    key={'shadow'}
    y={2}
    d={line}
    fill={'none'}
    strokeWidth={4}
    stroke={'rgba(0, 0, 0, 0.2)'}
  />
)

class AmountGraph extends Component {
  render() {
    const { accountHistory = [], isAssets } = this.props
    const data = []
    if (!accountHistory.length) return null

    accountHistory.map(account => data.push(account.amount))

    return (
      <View style={[ 
        styles.container,
        isAssets ? styles.assetsBackground : styles.liabilitiesBackground
      ]}>
        <LineChart
          animate={ true }
          animationDuration={ 500 }
          style={{ flex: 1 }}
          data={ data.reverse() }
          svg={{ stroke: COLOR.white }}
          contentInset={{ top: 10, bottom: 10 }}>
          
          <Shadow />
          <Decorator/>
        </LineChart>
      </View>
    )
  }
}

export default AmountGraph