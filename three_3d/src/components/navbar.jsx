import React, { useContext } from "react"
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';


import Three_test_2 from "./three_test_2";


const Body_ = (props) => {
        return (
        <div id="webgl">
        <Three_test_2 geometry={props.geometry} surface={props.surface} light={props.light} animation={props.animation}/>
        </div>
        )
    }


class Navbar_ extends React.Component{
    constructor(props){
        super(props);
        this.state = { 
            geometry: "box",
            surface: "solid",
            light: "none",
            animation: "none"
        };
        this.ref = React.createRef();

    }

    handleButton = () => {
            this.ref.current.focus();
    };
    render(){
        return (
            <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">Web Demo Three.js</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    
                    <NavDropdown title="Geometry" id="collasible-nav-dropdown">
                        <p>Value {this.state.geometry}</p>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"box"})}}>box</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"sphere"})}}>sphere</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({geometry:"cone"})}}>cone</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Surface" id="collasible-nav-dropdown">
                        <p>Value {this.state.surface}</p>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"point"})}}>point</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"line"})}}>line</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({surface:"solid"})}}>solid</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Light" id="collasible-nav-dropdown">
                        <p>Value {this.state.light}</p>
                        <NavDropdown.Item onClick={() => {this.setState({light:"point"})}}>point</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({light:"ambient"})}}>ambient</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({light:"remove"})}}>remove</NavDropdown.Item>
                    </NavDropdown>  
                    <NavDropdown title="Animation" id="collasible-nav-dropdown">
                        <p>Value {this.state.animation}</p>
                        <NavDropdown.Item onClick={() => {this.setState({animation:"box"})}}>box</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({animation:"box"})}}>sphere</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => {this.setState({animation:"box"})}}>cone</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                
            </Navbar.Collapse>
            </Navbar>
            <Body_ geometry={this.state.geometry} surface={this.state.surface} light={this.state.light} animation={this.state.animation}/>
            </>
        );
    }
}


export default Navbar_