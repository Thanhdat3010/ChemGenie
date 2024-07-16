/* eslint-disable no-unused-vars */
import React from 'react';
import './PeriodicTable.css';

class PeriodicTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          searchText: '',
          suggestionList: [],
          
        };
      }
    
      handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          this.goToUrl();
        }
      };
    
      goToUrl = () => {
  const { searchText } = this.state;
  const url = this.isValidUrl();
        
    // Nếu URL hợp lệ, chuyển hướng
    if (url !== searchText) {
     window.location.href = url;
    }
    };
    
      isValidUrl = () => {
        let { searchText } = this.state;
        searchText = this.convertToLowerCase(searchText);
        searchText = this.capitalizeFirstLetter(searchText);
        let url = searchText;
        let kt = 0;
        if (searchText === "Hydrogen") {
          url = "https://www.canva.com/design/DAFi_WQ09Ww/E3wAuJWz5psFK-gPmMQBZg/edit?utm_content=DAFi_WQ09Ww&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton";
          kt = 1;
        }
        if (searchText === "Helium") {
          url = "helium.html";
          kt = 1;
        }
        if (kt === 0) {
          return url;
        }
        return url;
      };
    
      convertToLowerCase = (inputString) => {
        return inputString.toLowerCase();
      };
    
      capitalizeFirstLetter = (inputString) => {
        return inputString.charAt(0).toUpperCase() + inputString.slice(1);
      };
    
      handleInputChange = (event) => {
        const inputValue = event.target.value.toLowerCase();
        const suggestions = [
          'Hydrogen', 'Helium', 'Lithium', 'Beryllium', 'Boron', 'Carbon', 'Nitrogen', 'Oxygen', 'Fluorine',
          'Neon', 'Sodium', 'Magnesium', 'Aluminum', 'Silicon', 'Phosphorus', 'Sulfur', 'Chlorine', 'Argon',
          'Potassium', 'Calcium', 'Scandium', 'Titanium', 'Vanadium', 'Chromium', 'Manganese', 'Iron', 'Cobalt',
          'Nickel', 'Copper', 'Zinc', 'Gallium', 'Germanium', 'Arsenic', 'Selenium', 'Bromine', 'Krypton',
          'Rubidium', 'Strontium', 'Yttrium', 'Zirconium', 'Niobium', 'Molybdenum', 'Technetium', 'Ruthenium',
          'Rhodium', 'Palladium', 'Silver', 'Cadmium', 'Indium', 'Tin', 'Antimony', 'Tellurium', 'Iodine', 'Xenon',
          'Caesium', 'Barium', 'Lanthanum', 'Cerium', 'Praseodymium', 'Neodymium', 'Promethium', 'Samarium', 'Europium',
          'Gadolinium', 'Terbium', 'Dysprosium', 'Holmium', 'Erbium', 'Thulium', 'Ytterbium', 'Lutetium', 'Hafnium',
          'Tantalum', 'Tungsten', 'Rhenium', 'Osmium', 'Iridium', 'Platinum', 'Gold', 'Mercury', 'Thallium', 'Lead',
          'Bismuth', 'Polonium', 'Astatine', 'Radon', 'Francium', 'Radium', 'Actinium', 'Thorium', 'Protactinium',
          'Uranium', 'Neptunium', 'Plutonium', 'Americium', 'Curium', 'Berkelium', 'Californium', 'Einsteinium',
          'Fermium', 'Mendelevium', 'Nobelium', 'Lawrencium', 'Rutherfordium', 'Dubnium', 'Seaborgium', 'Bohrium',
          'Hassium', 'Meitnerium', 'Darmstadtium', 'Roentgenium', 'Copernicium', 'Nihonium', 'Flerovium', 'Moscovium',
          'Livermorium', 'Tennessine', 'Oganesson'
        ];
    
        const filteredSuggestions = suggestions.filter(item => item.toLowerCase().includes(inputValue));
        this.setState({ suggestionList: filteredSuggestions });
      };
    
      handleSuggestionClick = (item) => {
        this.setState({ searchText: item, suggestionList: [] });
        this.goToUrl();
      };
    
      render() {
        const { suggestionList } = this.state;

    return (
      <div className="block contactBlock">
      <div className='Bangtuanhoan'>
        {/* <div className="search-container">
          <input
            type="text"
            id="search-text"
            onKeyDown={this.handleKeyDown}
            onChange={this.handleInputChange}
            placeholder="Search..."
            required
          />
          <ul id="suggestionList">
            {suggestionList.map((item, index) => (
              <li key={index} onClick={() => this.handleSuggestionClick(item)}>{item}</li>
            ))}
          </ul>
        </div> */}
        <h1 className="periodic-table-heading">
          <b>BẢNG TUẦN HOÀN HÓA HỌC</b>
        </h1>
        <center>
        <div className="table-container">
          <table>
          <tbody>
        <tr>
            <td className="H"><a href="https://www.canva.com/design/DAFi_WQ09Ww/E3wAuJWz5psFK-gPmMQBZg/edit?utm_content=DAFi_WQ09Ww&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">1<br />H</a></td>
            <td className="noBorder" colSpan="16"></td>
            <td className="He"><a href="https://www.canva.com/design/DAFi_j53d3g/NBCt87ObxlrPTE24MilWfA/edit?utm_content=DAFi_j53d3g&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">2<br />He</a></td>
        </tr>
        <tr>
            <td className="Li"><a href="https://www.canva.com/design/DAFjMcr-8G8/dDzv5HS0lhOeoq9psO4iPA/edit?utm_content=DAFjMcr-8G8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">3<br />Li</a></td>
            <td className="Be"><a href="https://www.canva.com/design/DAFjMo8WZnM/gghYOozsOpt74NNJk491tA/edit?utm_content=DAFjMo8WZnM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">4<br />Be</a></td>
            <td className="noBorder" colSpan="10"></td>
            <td className="B"><a href="https://www.canva.com/design/DAFjjHvbfi0/fIqjvceuM5dDey7azgTB_A/edit?utm_content=DAFjjHvbfi0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">5<br />B</a></td>
            <td className="C"><a href="https://www.canva.com/design/DAFjjAf5AqM/F9KTAbwUC0uMvz8hHGyTqg/edit?utm_content=DAFjjAf5AqM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">6<br />C</a></td>
            <td className="C"><a href="https://www.canva.com/design/DAFjjGRz2qo/O8GOTy8BZz32ySOlmUCtiw/edit?utm_content=DAFjjGRz2qo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">7<br />N</a></td>
            <td className="C"><a href="https://www.canva.com/design/DAFkHNRf2V4/pQy0_VWXofhOSN5q-tCRIA/edit?utm_content=DAFkHNRf2V4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">8<br />O</a></td>
            <td className="C"><a href="https://www.canva.com/design/DAFjjK9MWGo/e6kSfem35WP2Pvqe4GYi0g/edit?utm_content=DAFjjK9MWGo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">9<br />F</a></td>
            <td className="He"><a href="https://www.canva.com/design/DAFjjGaeMJ8/FPmb7JiB3-t1Hba6DUPOcQ/edit?utm_content=DAFjjGaeMJ8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">10<br />Ne</a></td>
        </tr>
        <tr>
            <td className="Li"><a href="https://www.canva.com/design/DAFjjN-Thl8/G7zbIhktY8XOATroMcem4A/edit?utm_content=DAFjjN-Thl8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">11<br />Na</a></td>
            <td className="Be"><a href="https://www.canva.com/design/DAFjjN1qtKA/1ZvM-wdRVP9Px5IC3hr3fg/edit?utm_content=DAFjjN1qtKA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">12<br />Mg</a></td>
            <td className="noBorder" colSpan="10"></td>
            <td className="Al"><a href="https://www.canva.com/design/DAFjjGUnsFA/IFaWRIdhrk-ko6YcQ5kyog/edit?utm_content=DAFjjGUnsFA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">13<br />Al</a></td>
            <td className="B"><a href="https://www.canva.com/design/DAFjjCp-zII/dx3vjfeXbeBvUXCBh4Avug/edit?utm_content=DAFjjCp-zII&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">14<br />Si</a></td>
            <td className="C"><a href="https://www.canva.com/design/DAFjjYLEYu0/D9s0-FSb2btnBUfzGelK_w/edit?utm_content=DAFjjYLEYu0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">15<br />P</a></td>
            <td className="C"><a href="https://www.canva.com/design/DAFjjfyHZ0U/DNqervNT9Eea5UNWNhKpwQ/edit?utm_content=DAFjjfyHZ0U&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">16<br />S</a></td>
            <td className="C"><a href="https://www.canva.com/design/DAFjjaTADvc/e2nZUqr50olEMBQVGJUnYA/edit?utm_content=DAFjjaTADvc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">17<br />Cl</a></td>
            <td className="He"><a href="https://www.canva.com/design/DAFjovqvj4I/YTTLf5L8Wz-i_2Ua0zApzw/edit?utm_content=DAFjovqvj4I&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">18<br />Ar</a></td>
        </tr>
        <tr>
            <td className="Li"><a href="https://www.canva.com/design/DAFjoidUDt4/SIh7zcFP5PFhofsucdyrLg/edit?utm_content=DAFjoidUDt4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">19<br />K</a></td>
            <td className="Be"><a href="https://www.canva.com/design/DAFjokTbS9Y/cMrB4t3e_W2Y8pbuQx9MBw/edit?utm_content=DAFjokTbS9Y&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">20<br />Ca</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjohi0zRg/1c4rzOWHYioa87tYSp86pQ/edit?utm_content=DAFjohi0zRg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">21<br />Sc</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjogM1BLA/67mRal0Se171cOmxqe2-sA/edit?utm_content=DAFjogM1BLA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">22<br />Ti</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjoh5z4W8/PIieObiMkeAg7LDw8gBtHg/edit?utm_content=DAFjoh5z4W8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">23<br />V</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjog3PLsk/BWF6lZd7YFty6sDVfFgtmw/edit?utm_content=DAFjog3PLsk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">24<br />Cr</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjoujznJc/ymZy7Byuyar3rW7yVtqtlw/edit?utm_content=DAFjoujznJc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">25<br />Mn</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjomxoauE/cOfzc9ZB2AEMcomIc4MJeg/edit?utm_content=DAFjomxoauE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">26<br />Fe</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjolZI07A/ItKDITTEEx6QURV61LTKNQ/edit?utm_content=DAFjolZI07A&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">27<br />Co</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjovRIM_Q/PixReN4f23G-VGnobHuglA/edit?utm_content=DAFjovRIM_Q&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">28<br />Ni</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjomN7vY0/LDQ84s6V9T3ZrYxs-c_7yA/edit?utm_content=DAFjomN7vY0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">29<br />Cu</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjos5g0LA/VfLCejtLaNt7P6tNEVYeEA/edit?utm_content=DAFjos5g0LA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">30<br />Zn</a></td>
            <td className="Al"><a href="https://www.canva.com/design/DAFjorQf-Q4/taZuZ4DLuRseAOL61uDmKg/edit?utm_content=DAFjorQf-Q4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">31<br />Ga</a></td>
            <td className="B"><a href="https://www.canva.com/design/DAFjovxHL8Q/bEkmIyi0FIJtNRjMwKx5KQ/edit?utm_content=DAFjovxHL8Q&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">32<br />Ge</a></td>
            <td className="B"><a href="https://www.canva.com/design/DAFjolCuDTk/0uBYqZxLuL2kc2KeI2PNGw/edit?utm_content=DAFjolCuDTk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">33<br />As</a></td>
            <td className="C"><a href="https://www.canva.com/design/DAFjoq3FbEg/AuK-ffzPo-4uwePU53-gKw/edit?utm_content=DAFjoq3FbEg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">34<br />Se</a></td>
            <td className="C"><a href="https://www.canva.com/design/DAFjpAv4TNg/6JOEmv9oaEDXp0t3-z26kw/edit?utm_content=DAFjpAv4TNg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">35<br />Br</a></td>
            <td className="He"><a href="https://www.canva.com/design/DAFjpDPdo2o/cFFehyycDhZr6pF8vPHqiQ/edit?utm_content=DAFjpDPdo2o&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">36<br />Kr</a></td>
        </tr>
        <tr>
            <td className="Li"><a href="https://www.canva.com/design/DAFjpLmM9RU/p8no035SkIpgrkiDb-xK7w/edit?utm_content=DAFjpLmM9RU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">37<br />Rb</a></td>
            <td className="Be"><a href="https://www.canva.com/design/DAFjpKJpnqk/9UobrT3a9w7djXoJycepqw/edit?utm_content=DAFjpKJpnqk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">38<br />Sr</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjpMT77d8/s-1jO9smgg2-EnOiWbYpGw/edit?utm_content=DAFjpMT77d8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">39<br />Y</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjpBbu7Mk/vYx0epiNLNQCm4NSusSjUg/edit?utm_content=DAFjpBbu7Mk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">40<br />Zr</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjpDvRftg/HtdCHDw3JaT-tdi3FHRecg/edit?utm_content=DAFjpDvRftg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">41<br />Nb</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjpOtajRI/DeqKUKLmnSSdl8B7BzT3Qg/edit?utm_content=DAFjpOtajRI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">42<br />Mo</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjpNhobIE/4F63socQAaI9aM2edXbm_g/edit?utm_content=DAFjpNhobIE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">43<br />Tc</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjpFzoZpc/wo57TvZHdMgRa6Ulj5Sr8A/edit?utm_content=DAFjpFzoZpc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">44<br />Ru</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjpKE26CA/LmI3G2rgexjWFUxmBCnDoQ/edit?utm_content=DAFjpKE26CA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">45<br />Rh</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjpGq8PS0/-HaFfjQunNJgStCs-0KP5A/edit?utm_content=DAFjpGq8PS0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">46<br />Pd</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjpFkYts8/yy9pR-ZWJGOnFVRpLJDbjA/edit?utm_content=DAFjpFkYts8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">47<br />Ag</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFjpF2biBs/RnAfjQ1wvmNC5kS_0OwYgQ/edit?utm_content=DAFjpF2biBs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">48<br />Cd</a></td>
            <td className="Al"><a href="https://www.canva.com/design/DAFjpHegTDg/YXAQHkCc8UBeou6_P5gnyQ/edit?utm_content=DAFjpHegTDg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">49<br />In</a></td>
            <td className="Al"><a href="https://www.canva.com/design/DAFjpG1VOP0/JETsg5b6T-Etd7_OISi84A/edit?utm_content=DAFjpG1VOP0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">50<br />Sn</a></td>
            <td className="B"><a href="https://www.canva.com/design/DAFjvMEujhI/akHOh3uC1dYVLvHGoFh7jQ/edit?utm_content=DAFjvMEujhI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">51<br />Sb</a></td>
            <td className="B"><a href="https://www.canva.com/design/DAFj1ev3_7o/cOUwb8DyeEMye_PN_WW6EA/edit?utm_content=DAFj1ev3_7o&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">52<br />Te</a></td>
            <td className="C"><a href="https://www.canva.com/design/DAFj1f7j9L0/vU_P8btYhokwxH-3GwoebA/edit?utm_content=DAFj1f7j9L0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">53<br />I</a></td>
            <td className="He"><a href="https://www.canva.com/design/DAFj1VA7tr8/KJUsf30ZkwbFjh6OzyvKVg/edit?utm_content=DAFj1VA7tr8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">54<br />Xe</a></td>
        </tr>
        <tr>
            <td className="Li"><a href="https://www.canva.com/design/DAFj1XvDuBw/xt4R25OhdFh_KgcT4coSGw/edit?utm_content=DAFj1XvDuBw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">55<br />Cs</a></td>
            <td className="Be"><a href="https://www.canva.com/design/DAFj1Z9oWk4/j0WxxLmQdNoiJstBQopJvg/edit?utm_content=DAFj1Z9oWk4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">56<br />Ba</a></td>
            <td className="La" colSpan="1">57-71<br /></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFj1mniX90/2vheYll-fM8y28Peze0nlA/edit?utm_content=DAFj1mniX90&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">72<br />Hf</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFj4br7XsY/-l7O_GPyqQJIz233V_rAIg/edit?utm_content=DAFj4br7XsY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">73<br />Ta</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFj4QjWaBs/BhV9skFSHjJm5bZJ9TZxvg/edit?utm_content=DAFj4QjWaBs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">74<br />W</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFj4ZhNQ1o/ASK7U9KkiCKdxMof95C4iA/edit?utm_content=DAFj4ZhNQ1o&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">75<br />Re</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFj4VAHqtg/iGj8QaeZmK27N8Q9vgkEaA/edit?utm_content=DAFj4VAHqtg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">76<br />Os</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFj4U8kv-Q/EGYO4hmdRhtfp8F3m_JFpg/edit?utm_content=DAFj4U8kv-Q&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">77<br />Ir</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFj4RnoH4Y/PUluQgjhA3WUuiNtAHG61A/edit?utm_content=DAFj4RnoH4Y&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">78<br />Pt</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFj4Ryd54c/VJRTjrxeXxqQ6OdjEktDZQ/edit?utm_content=DAFj4Ryd54c&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">79<br />Au</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFj4VPG1es/6MwHsIw3AuqO_4Ag3NyjZQ/edit?utm_content=DAFj4VPG1es&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">80<br />Hg</a></td>
            <td className="Al"><a href="https://www.canva.com/design/DAFj4Wmvq9U/ALEXlgyNOIrnjnX2hGQ65A/edit?utm_content=DAFj4Wmvq9U&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">81<br />Tl</a></td>
            <td className="Al"><a href="https://www.canva.com/design/DAFj4Spmq4c/1pdDytN0eH7DH-gAmAVIIQ/edit?utm_content=DAFj4Spmq4c&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">82<br />Pb</a></td>
            <td className="Al"><a href="https://www.canva.com/design/DAFj4oSoq8I/M_-RxGMLhem0Zhsq3Acb7g/edit?utm_content=DAFj4oSoq8I&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">83<br />Bi</a></td>
            <td className="Al"><a href="https://www.canva.com/design/DAFj4oX9VBo/vee3z2sW_cNEnrojjHvJJg/edit?utm_content=DAFj4oX9VBo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">84<br />Po</a></td>
            <td className="Al"><a href="https://www.canva.com/design/DAFj4oApY4Q/zX2uT_0Zl6qsrjHyaw3Yog/edit?utm_content=DAFj4oApY4Q&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">85<br />At</a></td>
            <td className="He"><a href="https://www.canva.com/design/DAFj7g7y6Cc/ub_5vf6ulQS8iK2Iw3IWvQ/edit?utm_content=DAFj7g7y6Cc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">86<br />Rn</a></td>
        </tr>
        <tr>
            <td className="Li"><a href="https://www.canva.com/design/DAFj7hE9gxw/gF4eLxuUORWDcgbHV4V8Xg/edit?utm_content=DAFj7hE9gxw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">87<br />Fr</a></td>
            <td className="Be"><a href="https://www.canva.com/design/DAFj7hoawIc/5uKJLjZntzf8g5q9T2M_rQ/edit?utm_content=DAFj7hoawIc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">88<br />Ra</a></td>
            <td className="Ac" colSpan="1">89-103<br /></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFkBfuoRN0/beT75BmHDBmlwFMimEorMQ/edit?utm_content=DAFkBfuoRN0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">104<br />Rf</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFkBeFCUGY/PQRsLFvtvJYwoaXuqEI2cg/edit?utm_content=DAFkBeFCUGY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">105<br />Db</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFkBUpjnAs/wV1cV4VdNpTdPzp_xW5HlQ/edit?utm_content=DAFkBUpjnAs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">106<br />Sg</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFkBVgfEAA/JWVopr04s2ko_7zs-sZbgA/edit?utm_content=DAFkBVgfEAA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">107<br />Bh</a></td>
            <td className="Sc"><a href="https://www.canva.com/design/DAFkBQoj6fQ/WFjix12V3-_p9FSyEkVocw/edit?utm_content=DAFkBQoj6fQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">108<br />Hs</a></td>
            <td className="Mt"><a href="https://www.canva.com/design/DAFkBTOQx_s/F8iIYh7UEbQcMFey0AuXIg/edit?utm_content=DAFkBTOQx_s&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">109<br />Mt</a></td>
            <td className="Mt"><a href="https://www.canva.com/design/DAFkBa8gEb8/qSH5iOyLXOiYOgrL2QFoyA/edit?utm_content=DAFkBa8gEb8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">110<br />Ds</a></td>
            <td className="Mt"><a href="https://www.canva.com/design/DAFkBfQ3xbI/hr7ZWCE4VcNQ9WVtufDkgA/edit?utm_content=DAFkBfQ3xbI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">111<br />Rg</a></td>
            <td className="Mt"><a href="https://www.canva.com/design/DAFkBcdbOG4/4jrGo5-g0QpK7LvkgyIAVg/edit?utm_content=DAFkBcdbOG4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">112<br />Cn</a></td>
            <td className="Mt"><a href="https://www.canva.com/design/DAFkBvqBFfg/iu4xLoCHi1myOg2hKWILRA/edit?utm_content=DAFkBvqBFfg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">113<br />Nh</a></td>
            <td className="Mt"><a href="https://www.canva.com/design/DAFkBk0NRCo/34epYYxSR7Ck9uSTBYJRLg/edit?utm_content=DAFkBk0NRCo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">114<br />Fl</a></td>
            <td className="Mt"><a href="https://www.canva.com/design/DAFkBpfLxPg/e777RPESU41sU0OyPDsM7A/edit?utm_content=DAFkBpfLxPg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">115<br />Mc</a></td>
            <td className="Mt"><a href="https://www.canva.com/design/DAFkBmv0cj0/G80mtP5dyTv7ugdbPuy_uA/edit?utm_content=DAFkBmv0cj0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">116<br />Lv</a></td>
            <td className="Mt"><a href="https://www.canva.com/design/DAFkBtwHnV8/qE-URG11qFPe4oEB1VRKCQ/edit?utm_content=DAFkBtwHnV8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">117<br />Ts</a></td>
            <td className="Mt"><a href="https://www.canva.com/design/DAFkBusATao/3ueLFOfmcwIy4_dkpNTkDQ/edit?utm_content=DAFkBusATao&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">118<br />Og</a></td>
        </tr>
        </tbody>
        </table>
        <br/>
        <table>
        <tbody>
        <tr>
            <td className="La"><a href="https://www.canva.com/design/DAFj1WXc5SQ/0O1Tkg3FQ4OeRBmAr3DvNQ/edit?utm_content=DAFj1WXc5SQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">57<br />La</a></td>
            <td className="La"><a href="https://www.canva.com/design/DAFj1Ysclzc/Ei1RGub7nZmYm6bj2dF7_Q/edit?utm_content=DAFj1Ysclzc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">58<br />Ce</a></td>
            <td className="La"><a href="https://www.canva.com/design/DAFj1aQZwLY/tnZ3UXj3hfX-xlD8NV6qdQ/edit?utm_content=DAFj1aQZwLY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">59<br />Pr</a></td>
            <td className="La"><a href="https://www.canva.com/design/DAFj1ad1bBk/lPwFxmDZ6ycW3xPYRg5zaA/edit?utm_content=DAFj1ad1bBk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">60<br />Nd</a></td>
            <td className="La"><a href="https://www.canva.com/design/DAFj1WDbb3o/pjFVNCy7XwyISgOQzttXRw/edit?utm_content=DAFj1WDbb3o&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">61<br />Pm</a></td>
            <td className="La"><a href="https://www.canva.com/design/DAFj1pukIak/cXKn2blZfK7-tG53qfMNTg/edit?utm_content=DAFj1pukIak&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">62<br />Sm</a></td>
            <td className="La"><a href="https://www.canva.com/design/DAFj1j_Ep40/YlCgyYmBeRvia2QtP6uzzw/edit?utm_content=DAFj1j_Ep40&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">63<br />Eu</a></td>
            <td className="La"><a href="https://www.canva.com/design/DAFj1oTsmKo/YQRg7ZtiR-b5i3omty35NQ/edit?utm_content=DAFj1oTsmKo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">64<br />Gd</a></td>
            <td className="La"><a href="https://www.canva.com/design/DAFj1utAp58/8i2qUn2RuW8mTOaAhGSFLw/edit?utm_content=DAFj1utAp58&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">65<br />Tb</a></td>
            <td className="La"><a href="https://www.canva.com/design/DAFj1nGjKHs/QxH_7aQQfhGs3BlT2r9imA/edit?utm_content=DAFj1nGjKHs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">66<br />Dy</a></td>
            <td className="La"><a href="https://www.canva.com/design/DAFj1qSkxCM/XYrwb4BTjGTB7x0UdD7OjQ/edit?utm_content=DAFj1qSkxCM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">67<br />Ho</a></td>
            <td className="La"><a href="https://www.canva.com/design/DAFj1mHh68g/NbncSdFnaPz-X7b3EtUTZg/edit?utm_content=DAFj1mHh68g&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">68<br />Er</a></td>
            <td className="La"><a href="https://www.canva.com/design/DAFj1hvlzK0/R7PPkg8k0Gfq4RpHVNuAtw/edit?utm_content=DAFj1hvlzK0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">69<br />Tm</a></td>
            <td className="La"><a href="https://www.canva.com/design/DAFj1rYxSCQ/zwUU8quwyCUdRCzSKEkimA/edit?utm_content=DAFj1rYxSCQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">70<br />Yb</a></td>
            <td className="La"><a href="https://www.canva.com/design/DAFj1mtjHAc/th0LniRZOpsXs9XuRxubjg/edit?utm_content=DAFj1mtjHAc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">71<br />Lu</a></td>
        </tr>
        <tr>
            <td className="Ac"><a href="https://www.canva.com/design/DAFj7sBvgfc/DxNC3vmu_M9vSQ2po3IL8w/edit?utm_content=DAFj7sBvgfc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">89<br />Ac</a></td>
            <td className="Ac"><a href="https://www.canva.com/design/DAFj7kCC9uc/Ms3VrZi4wrcXszovSCtj-A/edit?utm_content=DAFj7kCC9uc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">90<br />Th</a></td>
            <td className="Ac"><a href="https://www.canva.com/design/DAFj7mX75ss/07upfOLiO-99RtceC630tg/edit?utm_content=DAFj7mX75ss&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">91<br />Pa</a></td>
            <td className="Ac"><a href="https://www.canva.com/design/DAFj7sX2w-8/GczWFjUhk9XL-y6mVzQY0Q/edit?utm_content=DAFj7sX2w-8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">92<br />U</a></td>
            <td className="Ac"><a href="https://www.canva.com/design/DAFj7mH_pfg/F0WphJvBt5hVpP8fH_BvcA/edit?utm_content=DAFj7mH_pfg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">93<br />Np</a></td>
            <td className="Ac"><a href="https://www.canva.com/design/DAFj7l4zgdM/EKcCvscGViaqQ9oaHgftJA/edit?utm_content=DAFj7l4zgdM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">94<br />Pu</a></td>
            <td className="Ac"><a href="https://www.canva.com/design/DAFj7oj4cW8/GdHS1EM7ZsKXJPh8wwr-Gw/edit?utm_content=DAFj7oj4cW8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">95<br />Am</a></td>
            <td className="Ac"><a href="https://www.canva.com/design/DAFj7k_V-pc/LTheYy71WsWd8qafXpLCTQ/edit?utm_content=DAFj7k_V-pc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">96<br />Cm</a></td>
            <td className="Ac"><a href="https://www.canva.com/design/DAFj7t5oO_k/EewgqXd8Qi8x0hS_9-eF3w/edit?utm_content=DAFj7t5oO_k&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">97<br />Bk</a></td>
            <td className="Ac"><a href="https://www.canva.com/design/DAFj7iTGUas/OIiAQ4Cu6qUClu_NR9JRQA/edit?utm_content=DAFj7iTGUas&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">98<br />Cf</a></td>
            <td className="Ac"><a href="https://www.canva.com/design/DAFj7vJy2Yc/1-m-vKZPxRRpjpXSgXNDxw/edit?utm_content=DAFj7vJy2Yc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">99<br />Es</a></td>
            <td className="Ac"><a href="https://www.canva.com/design/DAFj7rEJLhk/2Qrvah5jEzU2GAV6HISt7A/edit?utm_content=DAFj7rEJLhk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">100<br />Fm</a></td>
            <td className="Ac"><a href="https://www.canva.com/design/DAFkBGRudLk/OZisVJEPTKVXl7nThHba3w/edit?utm_content=DAFkBGRudLk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">101<br />Md</a></td>
            <td className="Ac"><a href="https://www.canva.com/design/DAFkBB0CT5g/Wh5niHFNTkq_Ns8fOzQlgw/edit?utm_content=DAFkBB0CT5g&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">102<br />No</a></td>
            <td className="Ac"><a href="https://www.canva.com/design/DAFkBGWAa9Q/rIisMZNEozw54eq9tZfzyQ/edit?utm_content=DAFkBGWAa9Q&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">103<br />Lr</a></td>
        </tr>
        </tbody>
        </table>
        </div>
        </center>
        </div>
      </div>
    );
  }
}

export default PeriodicTable;
