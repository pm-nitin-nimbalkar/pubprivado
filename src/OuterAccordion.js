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
import Badge from '@mui/material/Badge';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -25,
    top: 10,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '7px',
    background: '#F24C3D'
  },
}));

const Summary = ({info}) => {
  return (
    <div style={{display: "flex", width: "100%", justifyContent: "flex-start", alignItems: "center", marginRight: "50px"}}>
      <div style={{display: 'inline', alignSelf: 'center'}}>
        <LanguageIcon sx={{color: grey[700] }}/>
      </div>
      <div style={{display: 'inline', alignSelf: 'center', marginLeft: '10px'}}>
        <StyledBadge badgeContent={info.data.length} color="primary">
          <span style={{color: "#2192b5", fontWeight: "700"}}>{info.domain}</span>
        </StyledBadge>
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
      <Accordion style={{marginBottom: "0px"}}>
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