import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Divider from '@mui/material/Divider';
import TableHead from '@mui/material/TableHead';
import { green, red } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const COMPLIANCE_VIOLATIONS = {
    1: "UserId Module violations.", //UserId module [module names], called when specific vendor consent was denied. Please check your CMP settings or reach out to your CMP vendor. Vendor consent data sent by CMP - [add vendor consent data here]
    2: "Auction violations in case of denied vendor consent.", // Bidder [module names], called when specific vendor consent was denied. Please check your CMP settings or reach out to your CMP vendor. Vendor consent data sent by CMP - [add vendor consent data here]
    3: "User syncup violations.", //User syncup was initiated when purpose 1 consent was denied. Please contact your CSOM for further assistance.
    4: "User ID syncup violations.", // //UserId syncup initiated when purpose 1 consent was denied. Please contact your CSOM for further assistance.
    5: "Auction violations in case of denied purpose 2.", // Bidder [module names], called when purpose 2 consent was denied. Please contact your CSOM for further assistance.
    6: "Incorrect value for gdprApplies flag by CMP.", // CPM return gdprApplies as false for a GDPR enabled region [Display geo detected by us here]. Please check your CMP settings or reach out to your CMP vendor.
    7: "consent signals (gdpr) not passed to user_sync.html call.", // url parameter gdpr was not passed to user_sync.html. Please contact your CSOM for further assistance.
    8: "consent signals (gdpr_consent) not passed to user_sync.html call.", //
    9: "consent signals (us_privacy) not passed to user_sync.html call.", // url parameter us_privacy was not passed to user_sync.html. Please contact your CSOM for further assistance (edited) 
}

const COMPLIANCE_VIOLATIONS_SUGGESTIONS = {
    1: "UserId module #META, called when specific vendor consent was denied. Please check your CMP settings or reach out to your CMP vendor.",
    2: "Bidder #META, called when specific vendor consent was denied. Please check your CMP settings or reach out to your CMP vendor.",
    3: "User syncup was initiated when purpose 1 consent was denied. Please contact your CSOM for further assistance.",
    4: "UserId syncup initiated when purpose 1 consent was denied. Please contact your CSOM for further assistance.",
    5: "Bidder called when purpose 2 consent was denied. Please contact your CSOM for further assistance.",
    6: "CPM return gdprApplies as false for a GDPR enabled region. Please check your CMP settings or reach out to your CMP vendor.",
    7: "consent signals (gdpr) not passed to user_sync.html call.", // url parameter gdpr was not passed to user_sync.html. Please contact your CSOM for further assistance.
    8: "consent signals (gdpr_consent) not passed to user_sync.html call.", //
    9: "consent signals (us_privacy) not passed to user_sync.html call.", // url parameter us_privacy was not passed to user_sync.html. Please contact your CSOM for further assistance (edited) 
}

const COMPLIANCE_MISCONFIGS = {
    1: "GDPR timeout", // Configured value - [add value here] is less than the recommended value of 10000. You can update the value from profile edit UI.
    2: "GDPR Action timeout.", // Value is not set, or is set to 0. You can update the value from profile edit UI.
    3: "GDPR enablement", //GDPR is not enabled, but a GDPR enabled geo was detected (Display loc detected here). Please enable GDPR config in the profile if you expect traffic from GDPR regions.
    4: "CCPA enablement", //CCPA is not enabled, but a CCPA enabled geo was detected (Display loc detected here). Please enable CCPA config in the profile if you expect traffic from CCPA enabled regions.
    5: "Multiple wrappers on page",//Multiple wrappers with same namespaces detected on the page. Ensure all wrappers have unique namespaces to avoid namespace clashes.
    6: "Prebid version", //Prebid version used is an older one. (Display version here). Upgrading to the latest version will most likely resolve all compliance related issues.
    7: "Consent management config." //Both GDPR and CCPA are enabled in a single profile. We recommend that you create separate profiles for each GDPR and CCPA applicable regions.
}

const COMPLIANCE_MISCONFIGS_SUGGESTIONS = {
    1: "Configured value - #META is less than the recommended value of 10000. You can update the value from OpenWrap profile edit UI.",
    2: "Value is not set, or is set to 0. You can update the value from OpenWrap profile edit UI.",
    3: "GDPR is not enabled, but a GDPR applicable geo was detected - #META. Please enable GDPR config in the profile if you expect traffic from GDPR regions.",
    4: "CCPA is not enabled, but a CCPA applicable geo was detected. Please enable CCPA config in the profile if you expect traffic from CCPA enabled regions.",
    5: "Multiple wrappers with same namespaces detected on the page. Ensure all wrappers have unique namespaces to avoid namespace clashes.",
    6: "Prebid version used is an older one. Upgrading to the latest version will most likely resolve all compliance related issues.",
    7: "Both GDPR and CCPA are enabled in a single profile. We recommend that you create separate profiles for each GDPR and CCPA applicable regions."
}

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      color: 'rgba(255, 255, 255, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 15,
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0)',
}));

const AccordionInfo = ({ data }) => {
  return (
    <div>
        <div style={{display: 'flex', flexDirection:'column', marginBottom: '30px'}}>
            <div className='inforow'>
                <span className='cell'>
                    <span className="key">CMP: </span>
                    <span className='value'>{data.cmpNm}</span>
                </span>
                <span className='cell'>
                    <span className="key">GDPR Enabled: </span>
                    <span className='value'>{data.ge ? "Yes" : "No"}</span>
                </span>
                <span className='cell'>
                    <span className="key">CCPA Enabled: </span>
                    <span className='value'>{data.ce ? 'Yes' : 'No'}</span>
                </span>
            </div>
            <div className='inforow'>
                <span className='cell'>
                    <span className="key">Prebid Version: </span>
                    <span className='value'>{data.pv}</span>
                </span>
                <span className='cell'>
                    <span className="key">GDPR Timeout: </span>
                    <span className='value'>{data.gto}</span>
                </span>
                <span className='cell'>
                    <span className="key">CCPA Timeout: </span>
                    <span className='value'>{data.cto}</span>
                </span>
            </div>
            <div className='inforow'>
                <span className='cell'>
                    <span className="key">Publisher Geo: </span>
                    <span className='value'>{data.cc}</span>
                </span>
                <span className='cell'>
                    <span className="key">GDPR applies: </span>
                    <span className='value'>{data.gdprA ? 'Yes' : 'No'}</span>
                </span>
                <span className='cell'>
                    <span className="key">USP API: </span>
                    <span className='value'>{data.cApi || 'iab'}</span>
                </span>
            </div>
            <div className='inforow'>
                <span className='cell'>
                    <span className="key">User location: </span>
                    <span className='value'>{data.loc}</span>
                </span>
                <span className='cell'>
                    <span className="key">CMP API: </span>
                    <span className='value'>{data.gApi || 'iab'}</span>
                </span>
                <span className='cell'>
                </span>
            </div>
        </div>
        <Divider />
        <div style={{display: "flex", marginTop: '10px'}}>
        <TableContainer component={Paper} sx={{ marginRight: '10px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ background: '#4fc8ed'}}>
                        <TableRow>
                            <TableCell
                                sx={{ fontWeight: 'bold', fontSize: 'large', color: 'white' }}
                            >Violations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(COMPLIANCE_VIOLATIONS).map((key, index) => {
                            let present = data.errors.violations.findIndex(item => item.errorCode == key);
                            let meta = present > -1 ? data.errors.violations[present].meta : '';

                            return (<TableRow
                                key={`mis${index}`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <LightTooltip title={COMPLIANCE_VIOLATIONS_SUGGESTIONS[key].replace("#META", meta)} placement="bottom-start">
                                    <div style={{display: 'flex'}}>
                                        {COMPLIANCE_VIOLATIONS[key]}
                                        {
                                            (present > -1) ?
                                            <CheckCircleIcon sx={{ color: green[500], marginLeft: "auto" }}/> :
                                            <HighlightOffIcon sx={{ alignSelf: 'right', color: red[500], marginLeft: "auto" }}/>                         
                                        }
                                    </div>
                                    </LightTooltip>
                                </TableCell>
                            </TableRow>)
                        }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ background: '#4fc8ed'}}>
                        <TableRow>
                            <TableCell
                                sx={{ fontWeight: 'bold', fontSize: 'large', color: 'white' }}
                            >Misconfigurations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(COMPLIANCE_MISCONFIGS).map((key, index) => {
                            let present = data.errors.misconfigs.findIndex(item => item.errorCode == key);
                            let meta = present > -1 ? data.errors.misconfigs[present].meta : '';
                            return (<TableRow
                                key={`mis${index}`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <LightTooltip title={COMPLIANCE_MISCONFIGS_SUGGESTIONS[key].replace("#META", meta)} placement="bottom-start">
                                        <div style={{display: 'flex'}}>
                                            <span>{COMPLIANCE_MISCONFIGS[key]}</span>
                                        {
                                            (present > -1) ?
                                            <HighlightOffIcon sx={{ alignSelf: 'right', color: red[500], marginLeft: "auto" }}/>:
                                             <CheckCircleIcon sx={{ color: green[500], marginLeft: "auto" }}/>
                                        }
                                        </div>
                                    </LightTooltip>
                                </TableCell>
                            </TableRow>)
                        }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>
  );
}

const InnerAccordion = ({ data }) => {
  return data.map((row, index) => {
    return (
        <Accordion key={'inner-' + index}  style={{marginBottom: "0px"}}>
            <MuiAccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography sx={{fontWeight: 'bold'}}>{`Violation - ${index+1}`}</Typography>
            </MuiAccordionSummary>
            <AccordionDetails>
                <AccordionInfo data={row}/>
            </AccordionDetails>
        </Accordion>
    );
  });
}

export default InnerAccordion;
