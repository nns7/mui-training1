import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as data from "./sample-data.js";
import { Stepper, Step, StepLabel } from '@mui/material';
import { Card, CardContent, CardActions } from '@mui/material';
import { List, ListItemText, ListItemButton, ListItemIcon } from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

function Content() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [answers, setAnswers] = React.useState(new Set());
    const exercises = data.exercises;

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleSkip = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
        setSkipped(new Set());
        setAnswers(new Set());
    };

    const handleListItemClick = (exerciseId, choiceId) => {
        setAnswers(() => {
            const newAnswers = {exerciseId: exerciseId, choiceId: choiceId};
            return [...answers, newAnswers];
        });
        handleNext();
    }

    return (
        <Grid container>
            <Grid sm={2} />
            <Grid lg={8} sm={8} spacing={10}>
                <Card>
                        {activeStep === exercises.length ? (
                            <CardContent>
                                <Typography sx={{ mt: 2, mb: 1 }} color='text.secondary' gutterBottom>
                                    All step completed
                                </Typography>
                                <Typography variant='h5' component="div">
                                    以下で回答してよろしいですか？
                                </Typography>
                            </CardContent>
                        ) : (
                            <CardContent>
                                <Typography sx={{ mt: 2, mb: 1 }} color='text.secondary' gutterBottom>
                                    Step {activeStep + 1}
                                </Typography>
                                <Typography variant='h5' component="div">
                                    {exercises[activeStep].sentence}
                                </Typography>
                                <List component="nav">
                                    {exercises[activeStep].choices.map((choice) => {
                                        return (
                                            <ListItemButton
                                                onClick={() => handleListItemClick(exercises[activeStep].id, choice.choiceId)}
                                            >
                                                <ListItemIcon><RadioButtonUncheckedIcon /></ListItemIcon>
                                                <ListItemText primary={choice.choiceText} />
                                            </ListItemButton>
                                        );
                                    })}
                                </List>
                            </CardContent>
                        )}
                        <CardContent>
                            <Stepper activeStep={activeStep}>
                                {exercises.map((index) => {
                                    const stepProps = {};
                                    if (isStepSkipped(index)) {
                                        stepProps.completed = false;
                                    }
                                    return (
                                        <Step key={index} {...stepProps}>
                                            <StepLabel />
                                        </Step>
                                    );
                                })}
                            </Stepper>
                        </CardContent>
                        {activeStep === exercises.length ? (
                            <CardActions>
                                <Button>
                                    Finish
                                </Button>
                                <div style={{ flexGrow: 1 }} />
                                <Button
                                    color='secondary'
                                    onClick={handleReset}
                                >
                                    Reset
                                </Button>
                            </CardActions>
                        ) : (
                            <CardActions>
                                <div style={{ flexGrow: 1 }} />
                                <Button
                                    color='secondary'
                                    onClick={handleSkip}
                                    sx={{ mr: 1 }}
                                >
                                    Skip
                                </Button>
                            </CardActions>
                        )}
                </Card>
            </Grid>
        </Grid>
    )
}

export default Content