import styled from "styled-components";

export const PageContainer = styled.div`
   display: flex;
   /* max-width: 1400px; */
   width: 100%;
   min-height: 100vh;
   justify-content: center;
   align-items: center;
   align-self: center;
   justify-self: center;
   background-color:lightyellow;
`;
export const Formular = styled.form`
   width: 1000px;
   min-height: 1000px;
   border: 1px solid darkgreen;
   padding: 20px;
   display: grid;
   grid-template-columns: 1fr;
   grid-template-areas:
      'nadpis'
      'vyber'
      'tridy'
      'cyklonosic'
      'kalkulace'
      'poznamka';
`;
export const FormSection = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;
   background-color: lightgray;
   padding: 20px;
   &:nth-child(1){
      grid-area: nadpis;
   }
   &:nth-child(2){
      grid-area: vyber;
   }
   &:nth-child(3){
      grid-area: tridy;
   }
   &:nth-child(4){
      grid-area: cyklonosic;
   }
   &:nth-child(5){
      grid-area: kalkulace;
   }
   &:nth-child(6){
      grid-area: poznamka;
   }
`;
export const SectionTitle = styled.h2`
   color: black;
   font-size: 25px;
   margin: 0px;
   padding: 0;
   padding-bottom: 10px;
`;
export const MainTitle = styled(SectionTitle)`
   font-size: 40px;
   align-self: center;
   justify-self: center;
`;
export const InputDiv = styled.div`
   display: flex;
   flex-direction: row;
   justify-content: flex-start;
   align-items: center;
`;
export const KontrolaButton = styled.div`
   display: flex;
   margin-top: 20px;
   background-color: white;
   border: 1px solid black;
   cursor: pointer;
   justify-content: center;
   align-items: center;
   ${props => {
      if (props.checked === 1) {
         return `
            background-color: green;
         `;
      }
      else if (props.checked === 2) {
         return `
            background-color: red;
         `;
      }
   }}
`;


