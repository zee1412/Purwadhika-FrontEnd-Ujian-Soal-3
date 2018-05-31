import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {Accordion,AccordionTab} from 'primereact/components/accordion/Accordion';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';
import {TabView,TabPanel} from 'primereact/components/tabview/TabView';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';

class App extends Component {

  constructor() { 
    super(); 
    this.state = { 
      aud_buy: '',
      aud_sell: '',
      // ------
      eur_buy: '',
      eur_sell: '',
      // -----
      gbp_buy: '',
      gbp_sell: '',
      // ----
      jpy_buy: '',
      jpy_sell: '',
      // -----
      usd_buy: '',
      usd_sell: '',

      // *******
      dataApi:[],
      userinput:'',
      konv_bitcoin: '',
      konv_rupiah: ''
  
    };
  }


  componentDidMount(){
    axios.get('https://blockchain.info/ticker') .then((ambilData) => {
      console.log(ambilData);
      this.setState({ aud_buy: ambilData.data.AUD.buy,
                      aud_sell: ambilData.data.AUD.sell,
                      // ------
                      eur_buy: ambilData.data.EUR.buy,
                      eur_sell: ambilData.data.EUR.sell,
                      // ----
                      
                      gbp_buy: ambilData.data.GBP.buy,
                      gbp_sell: ambilData.data.GBP.sell,
                      // ----
                      jpy_buy: ambilData.data.JPY.buy,
                      jpy_sell: ambilData.data.JPY.sell,
                      // -----
                      
                      usd_buy: ambilData.data.USD.buy,
                      usd_sell: ambilData.data.USD.sell
        
      });
    });
      
  }



  konv_rupiah(x_konv){
      
      var url = 'https://blockchain.info/tobtc?currency=USD&value='+ (x_konv/14000)
      axios.get(url)
      .then((coba)=>{
        console.log(coba.data);
        this.setState({
            
            konv_rupiah: 'Rp. '+x_konv+' - BTC '+coba.data

            })
        })
    
  }


  konv_bitcoin(x_bitcoin){
      
    var url = 'https://blockchain.info/tobtc?currency=USD&value='+ (x_bitcoin*14000)
    axios.get(url)
    .then((coba_bitcoin)=>{
      console.log(coba_bitcoin.data);
      this.setState({
          
          konv_bitcoin: x_bitcoin+' BTC = Rp. '+coba_bitcoin.data

          })
      })
  
}

  // https://blockchain.info/tobtc?currency=USD&value=500
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="https://www.mgscreativa.com/images/stories/virtuemart/product/logo-blockchain6.png" className="App-logo" alt="logo" />
          <h1 className="App-title">Blockchain | Bitcoin</h1>
          <h5>Mischa Hadiana</h5>
        </header>
        <div className="content-section implementation">
          <TabView>
            <TabPanel header="Bitcoin"  leftIcon="fa-bitcoin">
                <h2>Harga Bitcoin hari ini</h2>
                {/* <p>{this.state.aud_buy}</p>
                <p>{this.state.eur_buy}</p>
                <p>{this.state.gbp_buy}</p>
                <p>{this.state.jpy_buy}</p>
                <p>{this.state.usd_buy}</p> */}
                <div class="ui-g">
                  <div class="ui-g-4 gr-on">
                    <p><b>Mata Uang</b></p><hr />
                    <p>Dollar Australia (AUD)</p>
                    <p>Euro Eropa (EUR)</p>
                    <p>Poundsterling Inggris (GBP)</p>
                    <p>Yen Jepang (JPY)</p>
                    <p>Dollar Amerika (USD)</p>
                  </div>
                  <div class="ui-g-4 gr-on">
                    <p><b>Harga Beli</b></p><hr />
                    <p>{this.state.aud_buy}</p>
                    <p>{this.state.eur_buy}</p>
                    <p>{this.state.gbp_buy}</p>
                    <p>{this.state.jpy_buy}</p>
                    <p>{this.state.usd_buy}</p>
                  </div>
                  <div class="ui-g-4 gr-on">
                    <p><b>Harga Jual</b></p><hr />
                    <p>{this.state.aud_sell}</p>
                    <p>{this.state.eur_sell}</p>
                    <p>{this.state.gbp_sell}</p>
                    <p>{this.state.jpy_sell}</p>
                    <p>{this.state.usd_sell}</p>
                  </div>
              </div>
                
            </TabPanel>
            <TabPanel header="Rupiah ke Bitcoin"  leftIcon="fa-line-chart">
              <h2>Konversi Rupiah ke Bitcoin </h2>
              <h4>Kurs 1 USD = 14.000 IDR</h4>
              <InputText type="text" style={{width: '50%'}} onChange={(e) => this.setState({userinput: e.target.value}, this.konv_rupiah(e.target.value))} placeholder="Masukkan Nominal Rupiah..."/>
              <h4>{this.state.konv_rupiah}</h4>
            </TabPanel>
            <TabPanel header="Bitcoin ke Rupiah"  leftIcon="fa-pie-chart">
              <h2>Konversi Bitcoin ke Rupiah </h2>
                <h4>Kurs 1 USD = 14.000 IDR</h4>
                <InputText type="text" style={{width: '50%'}} onChange={(e) => this.setState({inputbitcoin: e.target.value}, this.konv_bitcoin(e.target.value))} placeholder="Masukkan Nominal Bitcoin..."/>
              <h4>{this.state.konv_bitcoin}</h4>
            </TabPanel>
        </TabView>
        </div>
        
      </div>
    );
  }
}

export default App;
