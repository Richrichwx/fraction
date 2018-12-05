import React, { Component } from 'react';
import styled from 'styled-components'


const Container = styled.div`
    width: 400px;
    display: flex;
    justify-content: space-between:
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px;
`;
const Input = styled.input`
    margin: 15px 0 0 0;
`;
const Button = styled.button`
    width: 100px;
    height: 40px;
    margin-top: 20px;
    cursor: pointer;
`;

class Testing extends Component {
    state = {
        numeratorLeft: '',
        denominatorLeft: '',
        numeratorRight: '',
        denominatorRight: '',
        commonNumerator: '',
        commonDenominator: '',
        wholeMixed: '',
        numeratorMixed: '',
        denominatorMixed: ''
    };
    changeNumeratorLeft = (e) => {
        this.setState({
            numeratorLeft: e.target.value,
        })
    };
    changeDenominatorLeft = (e) => {
        this.setState({
            denominatorLeft: e.target.value,
        })
    };
    changeNumeratorRight = (e) => {
        this.setState({
            numeratorRight: e.target.value,
        })
    };
    changeDenominatorRight = (e) => {
        this.setState({
            denominatorRight: e.target.value,
        })
    };
    addClick = (e) => {
        e.preventDefault();
        let nok;
        let bigDenom;
        let bool;
        let commonDenom;
        if(this.state.denominatorLeft > this.state.denominatorRight) {
            bigDenom = this.state.denominatorLeft;
            bool = true;
        }
        else {
            bigDenom = this.state.denominatorRight;
            bool = false;
        }
        let minDenom =  bool? this.state.denominatorRight : this.state.denominatorLeft;
        for(let i=2; i<=90; i++){
            commonDenom= bigDenom*i;
            if(commonDenom%minDenom===0) {
                nok = commonDenom;
                break;
            }
        }
        let result = ((nok/this.state.denominatorLeft)*this.state.numeratorLeft+
            (nok/this.state.denominatorRight)*this.state.numeratorRight);
        for(let i=2; i<=9;i++){
            if(result%i===0 && nok%i===0){
                result /=i;
                nok /=i;
                break;
            }
        }
        this.setState({
            commonDenominator: nok,
            commonNumerator: result,
        });
        if( result < nok){
            console.log('Дробь правильная');
        }
        else {
            console.log('Дробь неправильная');
        }
    };
    wholeClick = (e) => {
        e.preventDefault();
        let whole;
        let topMix;
        if(this.state.commonNumerator > this.state.commonDenominator) {
            whole = this.state.commonNumerator / this.state.commonDenominator;
            whole = Math.round(whole);
            topMix= this.state.commonNumerator - this.state.commonDenominator;
        }
        this.setState({
            wholeMixed: whole,
            numeratorMixed: topMix,
            denominatorMixed: this.state.commonDenominator
        })
    };
        render() {
        return (
            <div className="Testing">
            <Container>
                <Wrapper>
                <Input className="numeratorLeft" placeholder="Введите число"
                       onChange={this.changeNumeratorLeft}
                       value={this.state.numeratorLeft}/>
                <Input className="denominatorLeft" placeholder="Введите число"
                       onChange={this.changeDenominatorLeft}
                       value={this.state.denominatorLeft}/>
                </Wrapper>
                <Wrapper>
                <Input className="numeratorRight" placeholder="Введите число"
                       onChange={this.changeNumeratorRight}
                       value={this.state.numeratorRight}/>
                <Input className="denominatorRight" placeholder="Введите число"
                       onChange={this.changeDenominatorRight}
                       value={this.state.denominatorRight}/>
                </Wrapper>
            </Container>
                <Button onClick={this.addClick}>Вычеслить</Button>
                <p>Верхняя:{this.state.commonNumerator}</p>
                <p>Нижняя:{this.state.commonDenominator}</p>
                {this.state.commonNumerator > this.state.commonDenominator &&
                <Button onClick={this.wholeClick}>Смешанная дробь</Button>}
                {this.state.commonNumerator > this.state.commonDenominator &&
                <p>Целое:{this.state.wholeMixed}</p>}
                {this.state.commonNumerator > this.state.commonDenominator &&
                <p>Верхняя:{this.state.numeratorMixed}</p>}
                {this.state.commonNumerator > this.state.commonDenominator &&
                <p>Нижняя:{this.state.denominatorMixed}</p>}
            </div>
        );
    }
}

export default Testing;