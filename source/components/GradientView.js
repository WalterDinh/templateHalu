import React from "react"
import {View,} from "react-native"
import {Consts,Colors} from "utilities"
import LinearGradient from 'react-native-linear-gradient';



export default class GradientView extends React.Component {

    render(){

        const {style} = this.props
        return(
        <LinearGradient colors={[Colors.FIRST_GRADIENT_COLOR,Colors.SECOND_GRADIENT_COLOR]} style = {[styles.container,style]} >
            {this.props.children}
        </LinearGradient>
        )
    }
}

const styles = {
    container:{
        width:Consts.DEVICE_WIDTH,
        height: Consts.DEVICE_HEIGHT,
    }
}
