import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Box } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { withStyles } from '@material-ui/core/styles';
import { stepStyles } from './styles/ScenarioStepStyles';
import PopperMenu from './PopperMenu';
import Step from 'models/Step';
import CucumberTable from './CucumberTable';

const clickEventWrapper = (event, scenarioId, stepId, prevStatus, newStatus, handleStatusChange) => {
  event.stopPropagation();
  let node = event.currentTarget;
  const nextStatus = {
    passed: 'failed',
    failed: 'passed',
    undefined: 'passed',
    skipped: 'passed',
  };
  const status = newStatus ? newStatus : nextStatus[prevStatus];
  const prevStatusMap = [{ stepId: stepId, status: prevStatus }];
  const newStatusMap = [{ stepId: stepId, status: status }];

  if (node.className === 'MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button') {
    handleStatusChange(scenarioId, prevStatusMap, newStatusMap);
    return;
  }
  handleStatusChange(scenarioId, prevStatusMap, newStatusMap);
};

const renderScreenshot = (embeddings, handleScreenshotClicked, classes) => {
  const url = `http://localhost:28080/xbdd/rest/attachment/${embeddings}`;
  const alt = `Screenshot Not Found`;
  const style = { height: '100%', width: '100%' };
  return <img src={url} alt={alt} onClick={() => handleScreenshotClicked(<img src={url} alt={alt} style={style} />)} className={classes} />;
};

const ScenarioStep = props => {
  const {
    title,
    scenarioId,
    steps,
    hoveredStepId,
    anchor,
    handleStepHovered,
    handleStepNotHovered,
    handleMoreButtonHovered,
    handleMoreButtonNotHovered,
    handleStatusChange,
    handleScreenshotClicked,
    classes,
  } = props;

  const iconMap = {
    passed: <FontAwesomeIcon icon={faCheckSquare} className={`${classes.scenarioStepStatusPassed} ${classes.scenarioStepIcon}`} />,
    failed: <FontAwesomeIcon icon={faMinusSquare} className={`${classes.scenarioStepStatusFailed} ${classes.scenarioStepIcon}`} />,
    undefined: <FontAwesomeIcon icon={faSquare} className={classes.scenarioStepIcon} />,
    skipped: <FontAwesomeIcon icon={faSquare} className={classes.scenarioStepIcon} />,
  };

  const getFailedClasses = status => {
    var stepIconClasses = classes.stepIconBox;
    if (status === 'failed') {
      stepIconClasses += ` ${classes.stepIconFailed}`;
    }
    return stepIconClasses;
  };

  const renderBasicStep = (step, status) => (
    <div>
      <span className={classes.stepKeyword}>{step.keyword}</span>
      <span>{`${step.name} `}</span>
      {`${scenarioId} ${step.id}` === hoveredStepId ? (
        <PopperMenu
          scenarioId={scenarioId}
          stepId={step.id}
          anchor={anchor}
          status={status}
          handleMoreButtonHovered={handleMoreButtonHovered}
          handleMoreButtonNotHovered={handleMoreButtonNotHovered}
          handleStatusChange={handleStatusChange}
          clickEventWrapper={clickEventWrapper}
        />
      ) : null}
    </div>
  );

  return (
    <div className={classes.steps}>
      <div className={classes.stepTitle}>{title}</div>
      <List>
        {steps.map(step => {
          const status = step.manualStatus ? step.manualStatus : step.status;
          return (
            <div key={step.id}>
              <ListItem
                button
                className={classes.step}
                onClick={e => clickEventWrapper(e, scenarioId, step.id, status, null, handleStatusChange)}
                onMouseEnter={() => handleStepHovered(`${scenarioId} ${step.id}`)}
                onMouseLeave={() => handleStepNotHovered(`${scenarioId} ${step.id}`)}
              >
                <Box display="flex" flexDirection="row">
                  <Box p={1} className={getFailedClasses(status)}>
                    {iconMap[status]}
                  </Box>
                  <Box p={1} className={classes.stepContentBox}>
                    {renderBasicStep(step, status)}
                    {step.rows ? <CucumberTable rows={step.rows} /> : null}
                  </Box>
                </Box>
              </ListItem>
              {step.embeddings ? renderScreenshot(step.embeddings, handleScreenshotClicked, classes.screenshot) : null}
            </div>
          );
        })}
      </List>
    </div>
  );
};

ScenarioStep.propTypes = {
  title: PropTypes.string,
  scenarioId: PropTypes.string,
  steps: PropTypes.arrayOf(PropTypes.instanceOf(Step)),
  hoveredStepId: PropTypes.string,
  anchor: PropTypes.object,
  handleStepHovered: PropTypes.func.isRequired,
  handleStepNotHovered: PropTypes.func.isRequired,
  handleMoreButtonHovered: PropTypes.func.isRequired,
  handleMoreButtonNotHovered: PropTypes.func.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
  handleScreenshotClicked: PropTypes.func.isRequired,
  classes: PropTypes.shape({}),
};

export default withStyles(stepStyles)(ScenarioStep);
