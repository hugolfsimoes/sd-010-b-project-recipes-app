import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Perfil extends Component {
  render() {
    return (
      <>
        <section>
          <Header title="Perfil" searchIcon />
        </section>
        <Footer />
      </>
    );
  }
}

export default Perfil;