import './App.css';
import { FormSection, Formular, InputDiv, KontrolaButton, MainTitle, PageContainer, SectionTitle } from './AppStyles';
import { useReducer, useState, useEffect } from 'react';
// initialState pro useReducer
const defaultObjednavka = {
  letenka: 0, //letenka: '',
  // pocet: 1,
  horske: false,
  detske: false,
  silnicni: false,
  gravel: false,
  zpatecni: false,
  pocet1: 0,      //prejm. key na pocet a udelat 0?
  pocet2: 0,
  pocet3: 0,
  pocet4: 0,
  dnu: 1,
  nosic: 0,
  rozpocet: 0,
  poznamka: '',
};

function setObjednavka(objednavka, action) {
  switch (action.type) {
    case "update_text": return { ...objednavka, [action.key]: action.value };
    case "toggle_horske": return { ...objednavka, horske: !objednavka.horske };
    case "toggle_detske": return { ...objednavka, detske: !objednavka.detske };
    case "toggle_silnicni": return { ...objednavka, silnicni: !objednavka.silnicni };
    case "toggle_gravel": return { ...objednavka, gravel: !objednavka.gravel };

    case "update_number": return { ...objednavka, [action.key]: parseFloat(action.value) };
    case "toggle_zpatecni": return { ...objednavka, zpatecni: !objednavka.zpatecni };
    default: return objednavka;
  }
};

function App() {
  const [finalPrice, setFinalPrice] = useState(0);
  const [showFinalPrice, setShowFinalPrice] = useState(0);
  const [checked, setChecked] = useState(0);

  const [objednavka, dispatch] = useReducer(setObjednavka, defaultObjednavka);

  useEffect(() => {
    let newFinalPrice = getFinalPrice(objednavka);
    setShowFinalPrice(newFinalPrice);
  }, [objednavka]);

  const getFinalPrice = (objednavka) => {
    let BasePrice1 = 0;
    let BasePrice2 = 0;
    let BasePrice3 = 0;
    let BasePrice4 = 0;
    if (objednavka.horske) { BasePrice1 = (500 * objednavka.pocet1) };
    if (objednavka.detske) { BasePrice2 = (200 * objednavka.pocet2) };
    if (objednavka.silnicni) { BasePrice3 = (1500 * objednavka.pocet3) };
    if (objednavka.gravel) { BasePrice4 = (2500 * objednavka.pocet4) };

    let thisBasePrice = BasePrice1 + BasePrice2 + BasePrice3 + BasePrice4;
    let thisFinalPrice = thisBasePrice * objednavka.dnu;

    if (objednavka.nosic === 0.05) {
      thisFinalPrice += (thisFinalPrice * 0.05);
    }
    else if (objednavka.nosic === 0.1) {
      thisFinalPrice += (thisFinalPrice * 0.1);
    }
    setFinalPrice(thisFinalPrice);
    return thisFinalPrice;
  }

  const checkPrice = (objednavka) => {
    if (objednavka.rozpocet >= finalPrice) {
      let checkOK = 1;
      setChecked(checkOK);
    } else {
      let checkNOK = 2;
      setChecked(checkNOK);
    }
  };

  const [value, setValue] = useState("");
  const onChange = ({ target: { value } }) => setValue(prev => /^[@.a-zA-Z0-9\s]+$/.test(value) ? value : prev);


  return (
    <PageContainer>
      <Formular>
        <FormSection name="nadpis"><MainTitle>Pujcovna kol</MainTitle></FormSection>

        {/* VYBER KOL */}
        <FormSection name="vyber">
          <SectionTitle>Vyberte si druh a pocet kol</SectionTitle>
          <div>
            <label>Horske kolo</label>
            <input type="checkbox" id="horske" value={500} onChange={(e) => {
              dispatch({
                type: "toggle_horske",
              });
            }} />

            <label>&nbsp;&nbsp;Počet kol:</label>
            <select id='pocet1' onClick={(e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "pocet1",
              });
            }}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>


          <div>
            <label>Detske kolo</label>
            <input type="checkbox" id="detske" value={200} onChange={(e) => {
              dispatch({
                type: "toggle_detske",
              });
            }} />
            
            <label>&nbsp;&nbsp;Počet kol:</label>
            <select id='pocet2' onClick={(e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "pocet2",
              });
            }}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
          <div>


            <label>Silnicni kolo</label>
            <input type="checkbox" id="silnicni" value={1500} onChange={(e) => {
              dispatch({
                type: "toggle_silnicni",
              });
            }} />
           
            <label>&nbsp;&nbsp;Počet kol:</label>
            <select id='pocet3' onClick={(e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "pocet3",
              });
            }}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
          <div>
            <label>Gravel kolo </label>
            <input type="checkbox" id="gravel" value={2500} onChange={(e) => {
              dispatch({
                type: "toggle_gravel",
              });
            }} />
           
            <label>&nbsp;&nbsp;Počet kol:</label>
            <select id='pocet4' onClick={(e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "pocet4",
              });
            }}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
        </FormSection>


        {/* VYBER POCTU DNU*/}
        <FormSection name="tridy">
          <SectionTitle>Pocet dnu pujcovani kol</SectionTitle>
          <label>Vyberte si pocet dnu:</label>
          {/* <div> */}
          <select id='dnu' onClick={(e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "dnu",
            });
          }}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
          {/* </div> */}
        </FormSection>

        {/* CYKLONOSIC*/}
        <FormSection name="cyklonosic">
          <SectionTitle>Cyklonosič</SectionTitle>
          <InputDiv>
            <input type="radio" name="nosic" id="economy" value={0} onChange={(e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "nosic",
              });
            }} />
            <label>bez cyklonosice (0 Kc)</label>
          </InputDiv>
          <InputDiv>
            <input type="radio" name="nosic" id="strednin" value={0.05} onChange={(e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "nosic",
              });
            }} />
            <label>cyklonosič střešní (+5%)</label>
          </InputDiv>
          <InputDiv>
            <input type="radio" name="nosic" id="taznyn" value={0.10} onChange={(e) => {
              dispatch({
                type: "update_number",
                value: e.target.value,
                key: "nosic",
              });
            }} />
            <label>cyklonosič na tažné zařízení (+10%)</label>
          </InputDiv>
        </FormSection>


        {/* FINALNI CENA a BUDE TO STACIT? */}
        <FormSection name="kalkulace">
          <SectionTitle>Finalni cena</SectionTitle>
          <label>Celkova castka:</label>
          <input type="text" id="finalniCena" value={showFinalPrice} disabled />

          <label>Kolik chcete utratit?</label>
          <input type="text" id="rozpocet" value={objednavka.rozpocet} onChange={(e) => {
            dispatch({
              type: "update_number",
              value: e.target.value,
              key: "rozpocet",
            });
          }} />

          <KontrolaButton checked={checked} onClick={() => {
            checkPrice(objednavka);
            console.log(checked);
          }}>Kontrola, bude Vam to stacit?
          </KontrolaButton>
        </FormSection>


        {/* POZNAMKA */}
        <FormSection name="poznamka">
          <SectionTitle>E-mail</SectionTitle>
          <label>E-mail pro komunikaci</label>
          <input id="pozn" value={objednavka.pozn} placeholder="Napište sem vas e-mail" {...{ value, onChange }} />
          <br />
          <button>Poslat objednavku
          </button>

          {/* <div className="App">
            <input {...{ value, onChange }} />
          </div> */}

        </FormSection>
      </Formular>
    </PageContainer>
  );
};
export default App;
