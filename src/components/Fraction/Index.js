import React, { Component } from 'react';
import styled, { css } from 'styled-components'

const FractionContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const FractionContainerItems = styled.div`
    width: 420px;
    height: 150px;
    display: flex;
    align-items: center;
    margin-top: 200px;
    background: #483233;
    border-radius: 15px;
`;

const InputContainer = styled.div`
    width: 160px;
    height: 100px;
    display: flex;
    justify-content: space-between;
    margin-left: 20px;
`;

const ContainerButton = styled.div`
    display: flex;
`;

const InputContainerItems = styled.div`
    display:flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 40px;
    height: 20px;
    font-size: 14px;
    outline: none;
    text-align: center;
    margin: 15px 0 0 0;
    background-color: transparent;
    color: #fff;
    border: none;
    border-bottom: 1px solid #fff;
`;

const Button = styled.button`
    width: 40px;
    height: 30px;
    font-size: 20px;
    cursor: pointer;
    margin: 35px 10px 0 20px;
    background: #cebeaf;
    outline: none;
    border: 2px solid #cebeaf;
`;

const Text = styled.div`
    height: 100px;
    width: 30px;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 0 -10px 0 5px;
`;

const TextMixed = styled.div`
    height: 100px;
    width: 40px;
    display: flex;
    justify-content: space-between;
    text-align: center;
`;

const P = styled.p`
   font-size: 16px;
   color: #fff;
   ${ props => props.primary && css`
    margin: 40px 10px 0 5px;
  ` }
`;

const Select = styled.select`
    height: 30px;
    width: 40px;
    margin-top: 35px;
    background: #cebeaf;
    outline: none;
    border: 2px solid #cebeaf;
    font-size: 20px;
`;

const Option = styled.option`
    font-size: 25px;
    outline: none;
    border: 2px solid #cebeaf;
`;

class Fraction extends Component {

  state = {
    numeratorLeft: '',
    denominatorLeft: '',
    numeratorRight: '',
    denominatorRight: '',
    commonNumerator: '',
    commonDenominator: '',
    wholeEqually: '',
    wholeMixed: '',
    numeratorMixed: '',
    denominatorMixed: '',
    addition: '+'
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

    let nok = this.state.denominatorLeft * this.state.denominatorRight;

    let additionalLeft = nok / this.state.denominatorLeft;

    let additionalRight = nok / this.state.denominatorRight;

    let numeratorAdditionalLeft = this.state.numeratorLeft * additionalLeft;

    let numeratorAdditionalRight = this.state.numeratorRight * additionalRight;

    let wholeAdd;
    let resultNumerator;

    if (this.state.addition === 'addition') {
      resultNumerator = numeratorAdditionalLeft + numeratorAdditionalRight;

      if (this.state.numeratorLeft === this.state.denominatorLeft && this.state.numeratorRight === this.state.denominatorRight) {
        wholeAdd = 2;
        resultNumerator = '';
        nok = '';
      }
    }
    if (this.state.addition === 'subtraction') {
      resultNumerator = numeratorAdditionalLeft - numeratorAdditionalRight;

      if (this.state.numeratorLeft === this.state.denominatorLeft && this.state.numeratorRight === this.state.denominatorRight) {
        wholeAdd = 0;
        resultNumerator = '';
        nok = '';
      }
    }

    if (this.state.addition === 'multiplication') {
      let numeratorMultiplicat = this.state.numeratorLeft * this.state.numeratorRight;
      resultNumerator = numeratorMultiplicat;

      if (this.state.numeratorLeft === this.state.denominatorLeft && this.state.numeratorRight === this.state.denominatorRight) {
        wholeAdd = 1;
        resultNumerator = '';
        nok = '';
      }
    }

    if (this.state.addition === 'division') {
      let fractionСontraryCrossOne = this.state.numeratorLeft * this.state.denominatorRight;
      let fractionСontraryCrossTwo = this.state.numeratorRight * this.state.denominatorLeft;
      nok = fractionСontraryCrossTwo;
      resultNumerator = fractionСontraryCrossOne;

      if (this.state.numeratorLeft === this.state.denominatorLeft && this.state.numeratorRight === this.state.denominatorRight) {
        wholeAdd = 1;
        resultNumerator = '';
        nok = '';
      }
    }

    this.setState({
      wholeEqually: wholeAdd,
      commonDenominator: nok,
      commonNumerator: resultNumerator,
    });
  };

  wholeClick = (e) => {
    e.preventDefault();
    let whole;
    let topMix;

    if (this.state.commonNumerator > this.state.commonDenominator) {
      whole = this.state.commonNumerator / this.state.commonDenominator;
      whole = Math.round(whole);
      topMix = this.state.commonNumerator - this.state.commonDenominator;
    }

    this.setState({
      wholeMixed: whole,
      numeratorMixed: topMix,
      denominatorMixed: this.state.commonDenominator
    })
  };

  handlerChange = (e) => {
    this.setState({
      addition: e.target.value,
    })
  };

  render() {
    return (
      <FractionContainer>
        <FractionContainerItems>
          <InputContainer>
            <InputContainerItems>
              <Input className="numeratorLeft"
                     onChange={ this.changeNumeratorLeft }
                     value={ this.state.numeratorLeft }/>
              <Input className="denominatorLeft"
                     onChange={ this.changeDenominatorLeft }
                     value={ this.state.denominatorLeft }/>
            </InputContainerItems>
            <Select value={ this.state.addition } onChange={ this.handlerChange }>
              <Option></Option>
              <Option value="addition">+</Option>
              <Option value="subtraction">-</Option>
              <Option value="multiplication">x</Option>
              <Option value="division">/</Option>
            </Select>
            <InputContainerItems>
              <Input className="numeratorRight"
                     onChange={ this.changeNumeratorRight }
                     value={ this.state.numeratorRight }/>
              <Input className="denominatorRight"
                     onChange={ this.changeDenominatorRight }
                     value={ this.state.denominatorRight }/>
            </InputContainerItems>
          </InputContainer>
          <ContainerButton>
            <Button onClick={ this.addClick }>=</Button>
            <TextMixed>
              <P primary>{ this.state.wholeEqually }</P>
              <Text>
                <P>{ this.state.commonNumerator }</P>
                <P>{ this.state.commonDenominator }</P>
              </Text>
            </TextMixed>
            { this.state.commonNumerator > this.state.commonDenominator &&
            <Button onClick={ this.wholeClick }>/</Button> }
            <TextMixed>
              { this.state.commonNumerator > this.state.commonDenominator &&
              <P primary>{ this.state.wholeMixed }</P> }
              <Text>
                { this.state.commonNumerator > this.state.commonDenominator &&
                <P>{ this.state.numeratorMixed }</P> }
                { this.state.commonNumerator > this.state.commonDenominator &&
                <P>{ this.state.denominatorMixed }</P> }
              </Text>
            </TextMixed>
          </ContainerButton>
        </FractionContainerItems>
      </FractionContainer>
    );
  }
}

export default Fraction;