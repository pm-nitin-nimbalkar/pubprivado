import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import InnerAccordion from './InnerAccordion';
import LanguageIcon from '@mui/icons-material/Language';
import { grey } from '@mui/material/colors';

const Summary = ({info}) => {
  return (
    <div style={{display: "flex", width: "100%", justifyContent: "flex-start", alignItems: "center", marginRight: "50px"}}>
      <div style={{display: 'inline', alignSelf: 'center'}}>
        <LanguageIcon sx={{color: grey[700] }}/>
      </div>
      <div style={{display: 'inline', alignSelf: 'center', marginLeft: '10px'}}>
        {info.domain}
      </div>
    </div>
  );
}

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const OuterAccordion = ({ domain, data, health }) => {
  return (
      <Accordion style={{marginBottom: "30px"}}>
        <MuiAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Summary info={{domain, data}} />
        </MuiAccordionSummary>
        <AccordionDetails>
            <InnerAccordion data={data}/>
        </AccordionDetails>
      </Accordion>
  );
}

export default OuterAccordion;