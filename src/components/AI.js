import React, { useEffect } from 'react';
import * as tmImage from '@teachablemachine/image';
import "./AI.css";


function AI() {
  let model, webcam, labelContainer, maxPredictions;
  let lastLabel = '';

  async function init() {
    const URL = "https://teachablemachine.withgoogle.com/models/LM3G6lq_X/";
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    webcam = new tmImage.Webcam(300, 300);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    
  }

  async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
  }

  async function predict() {
    const predictions = await model.predictTopK(webcam.canvas, 1);
    const label = predictions[0].className;
    if (lastLabel !== label) {
      lastLabel = label;
      labelContainer.innerText = predictions[0].className;

      const nameAI = predictions[0].className;
      const i = nameAI[0];
      if ( nameAI === "Nothing"){
        document.getElementById("text").innerHTML = "";
      }
      if ( i === "A"){
        if ( nameAI === "Actinium"){
          const Actinium = "Xem chi tiết";
          const ActiniumAI = Actinium.link("https://www.canva.com/design/DAFj7sBvgfc/DxNC3vmu_M9vSQ2po3IL8w/edit?utm_content=DAFj7sBvgfc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = ActiniumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Aluminium"){
          const Aluminium = "Xem chi tiết";
          const AluminiumAI = Aluminium.link("https://www.canva.com/design/DAFjjGUnsFA/IFaWRIdhrk-ko6YcQ5kyog/edit?utm_content=DAFjjGUnsFA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = AluminiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Americium"){
          const Americium = "Xem chi tiết";
          const AmericiumAI = Americium.link("https://www.canva.com/design/DAFj7oj4cW8/GdHS1EM7ZsKXJPh8wwr-Gw/edit?utm_content=DAFj7oj4cW8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = AmericiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Antimony"){
          const Antimony = "Xem chi tiết";
          const AntimonyAI = Antimony.link("https://www.canva.com/design/DAFjvMEujhI/akHOh3uC1dYVLvHGoFh7jQ/edit?utm_content=DAFjvMEujhI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = AntimonyAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Argon"){
          const Argon = "Xem chi tiết";
          const ArgonAI = Argon.link("https://www.canva.com/design/DAFjovqvj4I/YTTLf5L8Wz-i_2Ua0zApzw/edit?utm_content=DAFjovqvj4I&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = ArgonAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Arsenic"){
          const Arsenic = "Xem chi tiết";
          const ArsenicAI = Arsenic.link("https://www.canva.com/design/DAFjolCuDTk/0uBYqZxLuL2kc2KeI2PNGw/edit?utm_content=DAFjolCuDTk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = ArsenicAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Astatine"){
          const Astatine = "Xem chi tiết";
          const AstatineAI = Astatine.link("https://www.canva.com/design/DAFj4oApY4Q/zX2uT_0Zl6qsrjHyaw3Yog/edit?utm_content=DAFj4oApY4Q&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = AstatineAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "B"){
        if ( nameAI === "Barium"){
          const Barium = "Xem chi tiết";
          const BariumAI = Barium.link("https://www.canva.com/design/DAFj1Z9oWk4/j0WxxLmQdNoiJstBQopJvg/edit?utm_content=DAFj1Z9oWk4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = BariumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Berkelium"){
          const Berkelium = "Xem chi tiết";
          const BerkeliumAI = Berkelium.link("https://www.canva.com/design/DAFj7t5oO_k/EewgqXd8Qi8x0hS_9-eF3w/edit?utm_content=DAFj7t5oO_k&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = BerkeliumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Beryllium"){
          const Beryllium = "Xem chi tiết";
          const BerylliumAI = Beryllium.link("https://www.canva.com/design/DAFjMo8WZnM/gghYOozsOpt74NNJk491tA/edit?utm_content=DAFjMo8WZnM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = BerylliumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Bismuth"){
          const Bismuth = "Xem chi tiết";
          const BismuthAI = Bismuth.link("https://www.canva.com/design/DAFj4oSoq8I/M_-RxGMLhem0Zhsq3Acb7g/edit?utm_content=DAFj4oSoq8I&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = BismuthAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Bohrium"){
          const Bohrium = "Xem chi tiết";
          const BohriumAI = Bohrium.link("https://www.canva.com/design/DAFkBVgfEAA/JWVopr04s2ko_7zs-sZbgA/edit?utm_content=DAFkBVgfEAA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = BohriumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Boron"){
          const Boron = "Xem chi tiết";
          const BoronAI = Boron.link("https://www.canva.com/design/DAFjjHvbfi0/fIqjvceuM5dDey7azgTB_A/edit?utm_content=DAFjjHvbfi0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = BoronAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Bromine"){
          const Bromine = "Xem chi tiết";
          const BromineAI = Bromine.link("https://www.canva.com/design/DAFjpAv4TNg/6JOEmv9oaEDXp0t3-z26kw/edit?utm_content=DAFjpAv4TNg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = BromineAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "C"){
        if ( nameAI === "Cadmium"){
          const Cadmium = "Xem chi tiết";
          const CadmiumAI = Cadmium.link("https://www.canva.com/design/DAFjpF2biBs/RnAfjQ1wvmNC5kS_0OwYgQ/edit?utm_content=DAFjpF2biBs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = CadmiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Caesium"){
          const Caesium = "Xem chi tiết";
          const CaesiumAI = Caesium.link("https://www.canva.com/design/DAFj1XvDuBw/xt4R25OhdFh_KgcT4coSGw/edit?utm_content=DAFj1XvDuBw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = CaesiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Calcium"){
          const Calcium = "Xem chi tiết";
          const CalciumAI = Calcium.link("https://www.canva.com/design/DAFjokTbS9Y/cMrB4t3e_W2Y8pbuQx9MBw/edit?utm_content=DAFjokTbS9Y&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = CalciumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Californium"){
          const Californium = "Xem chi tiết";
          const CaliforniumAI = Californium.link("https://www.canva.com/design/DAFj7iTGUas/OIiAQ4Cu6qUClu_NR9JRQA/edit?utm_content=DAFj7iTGUas&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = CaliforniumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Carbon"){
          const Carbon = "Xem chi tiết";
          const CarbonAI = Carbon.link("https://www.canva.com/design/DAFjjAf5AqM/F9KTAbwUC0uMvz8hHGyTqg/edit?utm_content=DAFjjAf5AqM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = CarbonAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Cerium"){
          const Cerium = "Xem chi tiết";
          const CeriumAI = Cerium.link("https://www.canva.com/design/DAFj1Ysclzc/Ei1RGub7nZmYm6bj2dF7_Q/edit?utm_content=DAFj1Ysclzc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = CeriumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Chlorine"){
          const Chlorine = "Xem chi tiết";
          const ChlorineAI = Chlorine.link("https://www.canva.com/design/DAFjjaTADvc/e2nZUqr50olEMBQVGJUnYA/edit?utm_content=DAFjjaTADvc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = ChlorineAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Chromium"){
          const Chromium = "Xem chi tiết";
          const ChromiumAI = Chromium.link("https://www.canva.com/design/DAFjog3PLsk/BWF6lZd7YFty6sDVfFgtmw/edit?utm_content=DAFjog3PLsk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = ChromiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Cobalt"){
          const Cobalt = "Xem chi tiết";
          const CobaltAI = Cobalt.link("https://www.canva.com/design/DAFjolZI07A/ItKDITTEEx6QURV61LTKNQ/edit?utm_content=DAFjolZI07A&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = CobaltAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Copernicium"){
          const Copernicium = "Xem chi tiết";
          const CoperniciumAI = Copernicium.link("https://www.canva.com/design/DAFkBcdbOG4/4jrGo5-g0QpK7LvkgyIAVg/edit?utm_content=DAFkBcdbOG4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = CoperniciumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Copper"){
          const Copper = "Xem chi tiết";
          const CopperAI = Copper.link("https://www.canva.com/design/DAFjomN7vY0/LDQ84s6V9T3ZrYxs-c_7yA/edit?utm_content=DAFjomN7vY0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = CopperAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Curium"){
          const Curium = "Xem chi tiết";
          const CuriumAI = Curium.link("https://www.canva.com/design/DAFj7k_V-pc/LTheYy71WsWd8qafXpLCTQ/edit?utm_content=DAFj7k_V-pc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = CuriumAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "D"){
        if ( nameAI === "Darmstadtium"){
          const Darmstadtium = "Xem chi tiết";
          const DarmstadtiumAI = Darmstadtium.link("https://www.canva.com/design/DAFkBa8gEb8/qSH5iOyLXOiYOgrL2QFoyA/edit?utm_content=DAFkBa8gEb8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = DarmstadtiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Dubnium"){
          const Dubnium = "Xem chi tiết";
          const DubniumAI = Dubnium.link("https://www.canva.com/design/DAFkBeFCUGY/PQRsLFvtvJYwoaXuqEI2cg/edit?utm_content=DAFkBeFCUGY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = DubniumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Dysprosium"){
          const Dysprosium = "Xem chi tiết";
          const DysprosiumAI = Dysprosium.link("https://www.canva.com/design/DAFj1nGjKHs/QxH_7aQQfhGs3BlT2r9imA/edit?utm_content=DAFj1nGjKHs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = DysprosiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "E"){
        if ( nameAI === "Einsteinium"){
          const Einsteinium = "Xem chi tiết";
          const EinsteiniumAI = Einsteinium.link("https://www.canva.com/design/DAFj7vJy2Yc/1-m-vKZPxRRpjpXSgXNDxw/edit?utm_content=DAFj7vJy2Yc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = EinsteiniumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Erbium"){
          const Erbium = "Xem chi tiết";
          const ErbiumAI = Erbium.link("https://www.canva.com/design/DAFj1mHh68g/NbncSdFnaPz-X7b3EtUTZg/edit?utm_content=DAFj1mHh68g&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = ErbiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Europium"){
          const Europium = "Xem chi tiết";
          const EuropiumAI = Europium.link("https://www.canva.com/design/DAFj1j_Ep40/YlCgyYmBeRvia2QtP6uzzw/edit?utm_content=DAFj1j_Ep40&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = EuropiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "F"){
        if ( nameAI === "Fermium"){
          const Fermium = "Xem chi tiết";
          const FermiumAI = Fermium.link("https://www.canva.com/design/DAFj7rEJLhk/2Qrvah5jEzU2GAV6HISt7A/edit?utm_content=DAFj7rEJLhk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = FermiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Flerovium"){
          const Flerovium = "Xem chi tiết";
          const FleroviumAI = Flerovium.link("https://www.canva.com/design/DAFkBk0NRCo/34epYYxSR7Ck9uSTBYJRLg/edit?utm_content=DAFkBk0NRCo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = FleroviumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Fluorine"){
          const Fluorine = "Xem chi tiết";
          const FluorineAI = Fluorine.link("https://www.canva.com/design/DAFjjK9MWGo/e6kSfem35WP2Pvqe4GYi0g/edit?utm_content=DAFjjK9MWGo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = FluorineAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Francium"){
          const Francium = "Xem chi tiết";
          const FranciumAI = Francium.link("https://www.canva.com/design/DAFj7hE9gxw/gF4eLxuUORWDcgbHV4V8Xg/edit?utm_content=DAFj7hE9gxw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = FranciumAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "G"){
        if ( nameAI === "Gadolinium"){
          const Gadolinium = "Xem chi tiết";
          const GadoliniumAI = Gadolinium.link("https://www.canva.com/design/DAFj1oTsmKo/YQRg7ZtiR-b5i3omty35NQ/edit?utm_content=DAFj1oTsmKo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = GadoliniumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Gallium"){
          const Gallium = "Xem chi tiết";
          const GalliumAI = Gallium.link("https://www.canva.com/design/DAFjorQf-Q4/taZuZ4DLuRseAOL61uDmKg/edit?utm_content=DAFjorQf-Q4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = GalliumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Germanium"){
          const Germanium = "Xem chi tiết";
          const GermaniumAI = Germanium.link("https://www.canva.com/design/DAFjovxHL8Q/bEkmIyi0FIJtNRjMwKx5KQ/edit?utm_content=DAFjovxHL8Q&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = GermaniumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Gold"){
          const Gold = "Xem chi tiết";
          const GoldAI = Gold.link("https://www.canva.com/design/DAFj4Ryd54c/VJRTjrxeXxqQ6OdjEktDZQ/edit?utm_content=DAFj4Ryd54c&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = GoldAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "H"){
        if ( nameAI === "Hafnium"){
          const Hafnium = "Xem chi tiết";
          const HafniumAI = Hafnium.link("https://www.canva.com/design/DAFj1mniX90/2vheYll-fM8y28Peze0nlA/edit?utm_content=DAFj1mniX90&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = HafniumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Hassium"){
          const Hassium = "Xem chi tiết";
          const HassiumAI = Hassium.link("https://www.canva.com/design/DAFkBQoj6fQ/WFjix12V3-_p9FSyEkVocw/edit?utm_content=DAFkBQoj6fQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = HassiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Helium"){
          const Helium = "Xem chi tiết";
          const HeliumAI = Helium.link("https://www.canva.com/design/DAFi_j53d3g/NBCt87ObxlrPTE24MilWfA/edit?utm_content=DAFi_j53d3g&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = HeliumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Holmium"){
          const Holmium = "Xem chi tiết";
          const HolmiumAI = Holmium.link("https://www.canva.com/design/DAFj1qSkxCM/XYrwb4BTjGTB7x0UdD7OjQ/edit?utm_content=DAFj1qSkxCM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = HolmiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Hydrogen"){
          const Hydrogen = "Xem chi tiết";
          const HydrogenAI = Hydrogen.link("https://www.canva.com/design/DAFi_WQ09Ww/E3wAuJWz5psFK-gPmMQBZg/edit?utm_content=DAFi_WQ09Ww&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = HydrogenAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "I"){
        if ( nameAI === "Indium"){
          const Indium = "Xem chi tiết";
          const IndiumAI = Indium.link("https://www.canva.com/design/DAFjpHegTDg/YXAQHkCc8UBeou6_P5gnyQ/edit?utm_content=DAFjpHegTDg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = IndiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Iodine"){
          const Iodine = "Xem chi tiết";
          const IodineAI = Iodine.link("https://www.canva.com/design/DAFj1f7j9L0/vU_P8btYhokwxH-3GwoebA/edit?utm_content=DAFj1f7j9L0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = IodineAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Iridium"){
          const Iridium = "Xem chi tiết";
          const IridiumAI = Iridium.link("https://www.canva.com/design/DAFj4U8kv-Q/EGYO4hmdRhtfp8F3m_JFpg/edit?utm_content=DAFj4U8kv-Q&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = IridiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Iron"){
          const Iron = "Xem chi tiết";
          const IronAI = Iron.link("https://www.canva.com/design/DAFjomxoauE/cOfzc9ZB2AEMcomIc4MJeg/edit?utm_content=DAFjomxoauE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = IronAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "K" ){
        if ( nameAI === "Krypton"){
          const Krypton = "Xem chi tiết";
          const KryptonAI = Krypton.link("https://www.canva.com/design/DAFjpDPdo2o/cFFehyycDhZr6pF8vPHqiQ/edit?utm_content=DAFjpDPdo2o&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = KryptonAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "L"){
        if ( nameAI === "Lanthanum"){
          const Lanthanum = "Xem chi tiết";
          const LanthanumAI = Lanthanum.link("https://www.canva.com/design/DAFj1WXc5SQ/0O1Tkg3FQ4OeRBmAr3DvNQ/edit?utm_content=DAFj1WXc5SQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = LanthanumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Lawrencium"){
          const Lawrencium = "Xem chi tiết";
          const LawrenciumAI = Lawrencium.link("https://www.canva.com/design/DAFkBGWAa9Q/rIisMZNEozw54eq9tZfzyQ/edit?utm_content=DAFkBGWAa9Q&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = LawrenciumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Lead"){
          const Lead = "Xem chi tiết";
          const LeadAI = Lead.link("https://www.canva.com/design/DAFj4Spmq4c/1pdDytN0eH7DH-gAmAVIIQ/edit?utm_content=DAFj4Spmq4c&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = LeadAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Lithium"){
          const Lithium = "Xem chi tiết";
          const LithiumAI = Lithium.link("https://www.canva.com/design/DAFjMcr-8G8/dDzv5HS0lhOeoq9psO4iPA/edit?utm_content=DAFjMcr-8G8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = LithiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Livermorium"){
          const Livermorium = "Xem chi tiết";
          const LivermoriumAI = Livermorium.link("https://www.canva.com/design/DAFkBmv0cj0/G80mtP5dyTv7ugdbPuy_uA/edit?utm_content=DAFkBmv0cj0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = LivermoriumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Lutetium"){
          const Lutetium = "Xem chi tiết";
          const LutetiumAI = Lutetium.link("https://www.canva.com/design/DAFj1mtjHAc/th0LniRZOpsXs9XuRxubjg/edit?utm_content=DAFj1mtjHAc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = LutetiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "M"){
        if ( nameAI === "Magnesium"){
          const Magnesium = "Xem chi tiết";
          const MagnesiumAI = Magnesium.link("https://www.canva.com/design/DAFjjN1qtKA/1ZvM-wdRVP9Px5IC3hr3fg/edit?utm_content=DAFjjN1qtKA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = MagnesiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Manganese"){
          const Manganese = "Xem chi tiết";
          const ManganeseAI = Manganese.link("https://www.canva.com/design/DAFjoujznJc/ymZy7Byuyar3rW7yVtqtlw/edit?utm_content=DAFjoujznJc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = ManganeseAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Meitnerium"){
          const Meitnerium = "Xem chi tiết";
          const MeitneriumAI = Meitnerium.link("https://www.canva.com/design/DAFkBTOQx_s/F8iIYh7UEbQcMFey0AuXIg/edit?utm_content=DAFkBTOQx_s&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = MeitneriumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Mendelevium"){
          const Mendelevium = "Xem chi tiết";
          const MendeleviumAI = Mendelevium.link("https://www.canva.com/design/DAFkBGRudLk/OZisVJEPTKVXl7nThHba3w/edit?utm_content=DAFkBGRudLk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = MendeleviumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Mercury"){
          const Mercury = "Xem chi tiết";
          const MercuryAI = Mercury.link("https://www.canva.com/design/DAFj4VPG1es/6MwHsIw3AuqO_4Ag3NyjZQ/edit?utm_content=DAFj4VPG1es&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = MercuryAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Molybdenum"){
          const Molybdenum = "Xem chi tiết";
          const MolybdenumAI = Molybdenum.link("https://www.canva.com/design/DAFjpOtajRI/DeqKUKLmnSSdl8B7BzT3Qg/edit?utm_content=DAFjpOtajRI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = MolybdenumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Moscovium"){
          const Moscovium = "Xem chi tiết";
          const MoscoviumAI = Moscovium.link("https://www.canva.com/design/DAFkBpfLxPg/e777RPESU41sU0OyPDsM7A/edit?utm_content=DAFkBpfLxPg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = MoscoviumAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "N"){
        if ( nameAI === "Neodymium"){
          const Neodymium = "Xem chi tiết";
          const NeodymiumAI = Neodymium.link("https://www.canva.com/design/DAFj1ad1bBk/lPwFxmDZ6ycW3xPYRg5zaA/edit?utm_content=DAFj1ad1bBk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = NeodymiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Neon"){
          const Neon = "Xem chi tiết";
          const NeonAI = Neon.link("https://www.canva.com/design/DAFjjGaeMJ8/FPmb7JiB3-t1Hba6DUPOcQ/edit?utm_content=DAFjjGaeMJ8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = NeonAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Neptunium"){
          const Neptunium = "Xem chi tiết";
          const NeptuniumAI = Neptunium.link("https://www.canva.com/design/DAFj7mH_pfg/F0WphJvBt5hVpP8fH_BvcA/edit?utm_content=DAFj7mH_pfg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = NeptuniumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Nickel"){
          const Nickel = "Xem chi tiết";
          const NickelAI = Nickel.link("https://www.canva.com/design/DAFjovRIM_Q/PixReN4f23G-VGnobHuglA/edit?utm_content=DAFjovRIM_Q&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = NickelAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Nihonium"){
          const Nihonium = "Xem chi tiết";
          const NihoniumAI = Nihonium.link("https://www.canva.com/design/DAFkBvqBFfg/iu4xLoCHi1myOg2hKWILRA/edit?utm_content=DAFkBvqBFfg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = NihoniumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Niobium"){
          const Niobium = "Xem chi tiết";
          const NiobiumAI = Niobium.link("https://www.canva.com/design/DAFjpDvRftg/HtdCHDw3JaT-tdi3FHRecg/edit?utm_content=DAFjpDvRftg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = NiobiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Nitrogen"){
          const Nitrogen = "Xem chi tiết";
          const NitrogenAI = Nitrogen.link("https://www.canva.com/design/DAFjjGRz2qo/O8GOTy8BZz32ySOlmUCtiw/edit?utm_content=DAFjjGRz2qo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = NitrogenAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Nobelium"){
          const Nobelium = "Xem chi tiết";
          const NobeliumAI = Nobelium.link("https://www.canva.com/design/DAFkBB0CT5g/Wh5niHFNTkq_Ns8fOzQlgw/edit?utm_content=DAFkBB0CT5g&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = NobeliumAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "O" ){
        if ( nameAI === "Oganesson"){
          const Oganesson = "Xem chi tiết";
          const OganessonAI = Oganesson.link("https://www.canva.com/design/DAFkBusATao/3ueLFOfmcwIy4_dkpNTkDQ/edit?utm_content=DAFkBusATao&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = OganessonAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Osmium"){
          const Osmium = "Xem chi tiết";
          const OsmiumAI = Osmium.link("https://www.canva.com/design/DAFj4VAHqtg/iGj8QaeZmK27N8Q9vgkEaA/edit?utm_content=DAFj4VAHqtg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = OsmiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Oxygen"){
          const Oxygen = "Xem chi tiết";
          const OxygenAI = Oxygen.link("https://www.canva.com/design/DAFjjAUrndI/Xwdx9WKQPZ7oPrc0ziSE8g/edit?utm_content=DAFjjAUrndI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = OxygenAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "P" ){
        if ( nameAI === "Palladium"){
          const Palladium = "Xem chi tiết";
          const PalladiumAI = Palladium.link("https://www.canva.com/design/DAFjpGq8PS0/-HaFfjQunNJgStCs-0KP5A/edit?utm_content=DAFjpGq8PS0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = PalladiumAI; 
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Phosphorus"){
          const Phosphorus = "Xem chi tiết";
          const PhosphorusAI = Phosphorus.link("https://www.canva.com/design/DAFjjYLEYu0/D9s0-FSb2btnBUfzGelK_w/edit?utm_content=DAFjjYLEYu0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = PhosphorusAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Platinum"){
          const Platinum = "Xem chi tiết";
          const PlatinumAI = Platinum.link("https://www.canva.com/design/DAFj4RnoH4Y/PUluQgjhA3WUuiNtAHG61A/edit?utm_content=DAFj4RnoH4Y&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = PlatinumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Plutonium"){
          const Plutonium = "Xem chi tiết";
          const PlutoniumAI = Plutonium.link("https://www.canva.com/design/DAFj7l4zgdM/EKcCvscGViaqQ9oaHgftJA/edit?utm_content=DAFj7l4zgdM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = PlutoniumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Polonium"){
          const Polonium = "Xem chi tiết";
          const PoloniumAI = Polonium.link("https://www.canva.com/design/DAFj4oX9VBo/vee3z2sW_cNEnrojjHvJJg/edit?utm_content=DAFj4oX9VBo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = PoloniumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Potassium"){
          const Potassium = "Xem chi tiết";
          const PotassiumAI = Potassium.link("https://www.canva.com/design/DAFjoidUDt4/SIh7zcFP5PFhofsucdyrLg/edit?utm_content=DAFjoidUDt4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = PotassiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Praseodymium"){
          const Praseodymium = "Xem chi tiết";
          const PraseodymiumAI = Praseodymium.link("https://www.canva.com/design/DAFj1aQZwLY/tnZ3UXj3hfX-xlD8NV6qdQ/edit?utm_content=DAFj1aQZwLY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = PraseodymiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Promethium"){
          const Promethium = "Xem chi tiết";
          const PromethiumAI = Promethium.link("https://www.canva.com/design/DAFj1WDbb3o/pjFVNCy7XwyISgOQzttXRw/edit?utm_content=DAFj1WDbb3o&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = PromethiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Protactinium"){
          const Protactinium = "Xem chi tiết";
          const ProtactiniumAI = Protactinium.link("https://www.canva.com/design/DAFj7mX75ss/07upfOLiO-99RtceC630tg/edit?utm_content=DAFj7mX75ss&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = ProtactiniumAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "R" ){
        if ( nameAI === "Radium"){
          const Radium = "Xem chi tiết";
          const RadiumAI = Radium.link("https://www.canva.com/design/DAFj7hoawIc/5uKJLjZntzf8g5q9T2M_rQ/edit?utm_content=DAFj7hoawIc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = RadiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Radon"){
          const Radon = "Xem chi tiết";
          const RadonAI = Radon.link("https://www.canva.com/design/DAFj7g7y6Cc/ub_5vf6ulQS8iK2Iw3IWvQ/edit?utm_content=DAFj7g7y6Cc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = RadonAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Rhenium"){
          const Rhenium = "Xem chi tiết";
          const RheniumAI = Rhenium.link("https://www.canva.com/design/DAFj4ZhNQ1o/ASK7U9KkiCKdxMof95C4iA/edit?utm_content=DAFj4ZhNQ1o&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = RheniumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Rhodium"){
          const Rhodium = "Xem chi tiết";
          const RhodiumAI = Rhodium.link("https://www.canva.com/design/DAFjpKE26CA/LmI3G2rgexjWFUxmBCnDoQ/edit?utm_content=DAFjpKE26CA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = RhodiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Roentgenium"){
          const Roentgenium = "Xem chi tiết";
          const RoentgeniumAI = Roentgenium.link("https://www.canva.com/design/DAFkBfQ3xbI/hr7ZWCE4VcNQ9WVtufDkgA/edit?utm_content=DAFkBfQ3xbI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = RoentgeniumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Rubidium"){
          const Rubidium = "Xem chi tiết";
          const RubidiumAI = Rubidium.link("https://www.canva.com/design/DAFjpLmM9RU/p8no035SkIpgrkiDb-xK7w/edit?utm_content=DAFjpLmM9RU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = RubidiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Ruthenium"){
          const Ruthenium = "Xem chi tiết";
          const RutheniumAI = Ruthenium.link("https://www.canva.com/design/DAFjpFzoZpc/wo57TvZHdMgRa6Ulj5Sr8A/edit?utm_content=DAFjpFzoZpc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = RutheniumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Rutherfordium"){
          const Rutherfordium = "Xem chi tiết";
          const RutherfordiumAI = Rutherfordium.link("https://www.canva.com/design/DAFkBfuoRN0/beT75BmHDBmlwFMimEorMQ/edit?utm_content=DAFkBfuoRN0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = RutherfordiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "S" ){
        if ( nameAI === "Strontium"){
          const Strontium = "Xem chi tiết";
          const StrontiumAI = Strontium.link("https://www.canva.com/design/DAFjpKJpnqk/9UobrT3a9w7djXoJycepqw/edit?utm_content=DAFjpKJpnqk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = StrontiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Samarium"){
          const Samarium = "Xem chi tiết";
          const SamariumAI = Samarium.link("https://www.canva.com/design/DAFj1pukIak/cXKn2blZfK7-tG53qfMNTg/edit?utm_content=DAFj1pukIak&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = SamariumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Scandium"){
          const Scandium = "Xem chi tiết";
          const ScandiumAI = Scandium.link("https://www.canva.com/design/DAFjohi0zRg/1c4rzOWHYioa87tYSp86pQ/edit?utm_content=DAFjohi0zRg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = ScandiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Seaborgium"){
          const Seaborgium = "Xem chi tiết";
          const SeaborgiumAI = Seaborgium.link("https://www.canva.com/design/DAFkBUpjnAs/wV1cV4VdNpTdPzp_xW5HlQ/edit?utm_content=DAFkBUpjnAs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = SeaborgiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Selenium"){
          const Selenium = "Xem chi tiết";
          const SeleniumAI = Selenium.link("https://www.canva.com/design/DAFjoq3FbEg/AuK-ffzPo-4uwePU53-gKw/edit?utm_content=DAFjoq3FbEg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = SeleniumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Silicon"){
          const Silicon = "Xem chi tiết";
          const SiliconAI = Silicon.link("https://www.canva.com/design/DAFjjCp-zII/dx3vjfeXbeBvUXCBh4Avug/edit?utm_content=DAFjjCp-zII&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = SiliconAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Silver"){
          const Silver = "Xem chi tiết";
          const SilverAI = Silver.link("https://www.canva.com/design/DAFjpFkYts8/yy9pR-ZWJGOnFVRpLJDbjA/edit?utm_content=DAFjpFkYts8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = SilverAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Sodium"){
          const Sodium = "Xem chi tiết";
          const SodiumAI = Sodium.link("https://www.canva.com/design/DAFjjN-Thl8/G7zbIhktY8XOATroMcem4A/edit?utm_content=DAFjjN-Thl8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = SodiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Sulfur"){
          const Sulfur = "Xem chi tiết";
          const SulfurAI = Sulfur.link("https://www.canva.com/design/DAFjjfyHZ0U/DNqervNT9Eea5UNWNhKpwQ/edit?utm_content=DAFjjfyHZ0U&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = SulfurAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "T" ){
        if ( nameAI === "Tantalum"){
          const Tantalum = "Xem chi tiết";
          const TantalumAI = Tantalum.link("https://www.canva.com/design/DAFj4br7XsY/-l7O_GPyqQJIz233V_rAIg/edit?utm_content=DAFj4br7XsY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = TantalumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Technetium"){
          const Technetium = "Xem chi tiết";
          const TechnetiumAI = Technetium.link("https://www.canva.com/design/DAFjpNhobIE/4F63socQAaI9aM2edXbm_g/edit?utm_content=DAFjpNhobIE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = TechnetiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Tellurium"){
          const Tellurium = "Xem chi tiết";
          const TelluriumAI = Tellurium.link("https://www.canva.com/design/DAFj1ev3_7o/cOUwb8DyeEMye_PN_WW6EA/edit?utm_content=DAFj1ev3_7o&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = TelluriumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Tennessine"){
          const Tennessine = "Xem chi tiết";
          const TennessineAI = Tennessine.link("https://www.canva.com/design/DAFkBtwHnV8/qE-URG11qFPe4oEB1VRKCQ/edit?utm_content=DAFkBtwHnV8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = TennessineAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Terbium"){
          const Terbium = "Xem chi tiết";
          const TerbiumAI = Terbium.link("https://www.canva.com/design/DAFj1utAp58/8i2qUn2RuW8mTOaAhGSFLw/edit?utm_content=DAFj1utAp58&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = TerbiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Thallium"){
          const Thallium = "Xem chi tiết";
          const ThalliumAI = Thallium.link("https://www.canva.com/design/DAFj4Wmvq9U/ALEXlgyNOIrnjnX2hGQ65A/edit?utm_content=DAFj4Wmvq9U&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = ThalliumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Thorium"){
          const Thorium = "Xem chi tiết";
          const ThoriumAI = Thorium.link("https://www.canva.com/design/DAFj7kCC9uc/Ms3VrZi4wrcXszovSCtj-A/edit?utm_content=DAFj7kCC9uc&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = ThoriumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Thulium"){
          const Thulium = "Xem chi tiết";
          const ThuliumAI = Thulium.link("https://www.canva.com/design/DAFj1hvlzK0/R7PPkg8k0Gfq4RpHVNuAtw/edit?utm_content=DAFj1hvlzK0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = ThuliumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Tin"){
          const Tin= "Xem chi tiết";
          const TinAI = Tin.link("https://www.canva.com/design/DAFjpG1VOP0/JETsg5b6T-Etd7_OISi84A/edit?utm_content=DAFjpG1VOP0&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = TinAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Titanium"){
          const Titanium = "Xem chi tiết";
          const TitaniumAI = Titanium.link("https://www.canva.com/design/DAFjogM1BLA/67mRal0Se171cOmxqe2-sA/edit?utm_content=DAFjogM1BLA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = TitaniumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Tungsten"){
          const Tungsten = "Xem chi tiết";
          const TungstenAI = Tungsten.link("https://www.canva.com/design/DAFj4QjWaBs/BhV9skFSHjJm5bZJ9TZxvg/edit?utm_content=DAFj4QjWaBs&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = TungstenAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "U" ){
        if ( nameAI === "Uranium"){
          const Uranium = "Xem chi tiết";
          const UraniumAI = Uranium.link("https://www.canva.com/design/DAFj7sX2w-8/GczWFjUhk9XL-y6mVzQY0Q/edit?utm_content=DAFj7sX2w-8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = UraniumAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "V" ){
        if ( nameAI === "Vanadium"){
          const Vanadium = "Xem chi tiết";
          const VanadiumAI = Vanadium.link("https://www.canva.com/design/DAFjoh5z4W8/PIieObiMkeAg7LDw8gBtHg/edit?utm_content=DAFjoh5z4W8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = VanadiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "X" ){
        if ( nameAI === "Xenon"){
          const Xenon = "Xem chi tiết";
          const XenonAI = Xenon.link("https://www.canva.com/design/DAFj1VA7tr8/KJUsf30ZkwbFjh6OzyvKVg/edit?utm_content=DAFj1VA7tr8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = XenonAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "Y" ){
        if ( nameAI === "Ytterbium"){
          const Ytterbium = "Xem chi tiết";
          const YtterbiumAI = Ytterbium.link("https://www.canva.com/design/DAFj1rYxSCQ/zwUU8quwyCUdRCzSKEkimA/edit?utm_content=DAFj1rYxSCQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = YtterbiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Yttrium"){
          const Yttrium = "Xem chi tiết";
          const YttriumAI = Yttrium.link("https://www.canva.com/design/DAFjpMT77d8/s-1jO9smgg2-EnOiWbYpGw/edit?utm_content=DAFjpMT77d8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = YttriumAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
      if ( i === "Z" ){
        if ( nameAI === "Zinc"){
          const Zinc = "Xem chi tiết";
          const ZincAI = Zinc.link("https://www.canva.com/design/DAFjos5g0LA/VfLCejtLaNt7P6tNEVYeEA/edit?utm_content=DAFjos5g0LA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = ZincAI;
          document.getElementById("myDIV").style.display = "block";
        }
        if ( nameAI === "Zirconium"){
          const Zirconium = "Xem chi tiết";
          const ZirconiumAI = Zirconium.link("https://www.canva.com/design/DAFjpBbu7Mk/vYx0epiNLNQCm4NSusSjUg/edit?utm_content=DAFjpBbu7Mk&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
          document.getElementById("text").innerHTML = ZirconiumAI;
          document.getElementById("myDIV").style.display = "block";
        }
      }
    }
  }
  function startCamera() {
    init();
  }
  useEffect(() => {
    return () => {
      if (webcam) webcam.stop();
    };
  }, []);

  return (
    <div className="AiPage">
      <div id="title">
        <b>NHẬN DIỆN AI</b><br />
        <button className='button-camera' onClick={startCamera}>Start</button>
      </div>
      <div id="webcam-container" style={{ textAlign: 'center' }}></div>
      <div id="label-container" style={{ textAlign: 'center' }}></div>
      <center>
        <div id="myDIV" style={{ backgroundColor: '#1089ff', width: '200px', marginLeft: '10px', display: 'none', borderRadius: '15px' }}>
          <p id="text"></p>
        </div>
      </center>
    </div>
  );
}

export default AI;