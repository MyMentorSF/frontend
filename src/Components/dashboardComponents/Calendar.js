import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  DayView,
  Appointments,
  MonthView,
  WeekView,
  DateNavigator,
  Toolbar,
  ViewSwitcher,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";

const useStyles = makeStyles((theme) => ({
  calendar: {
    marginLeft: "auto",
    width: "60em",
    maxHeight: "50em",
    overflowY: "scroll",
  },
}));

const schedulerData = [
  {
    startDate: "2020-07-01T09:45",
    endDate: "2020-07-01T11:00",
    title: "Meeting",
    id: 4,
    location: "Room 3",
  },
  {
    startDate: "2020-07-01T12:00",
    endDate: "2020-07-01T13:30",
    title: "Labs Appointment",
    id: 5,
    location: "Room 2",
  },
];

function Calendar() {
  const classes = useStyles();
  const [scheduleData, updateSchedule] = useState(schedulerData);

  function commitChanges({ added, changed, deleted }) {
    updateSchedule((prevState) => {
      let data = prevState;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return data;
    });
  }

  return (
    <Paper className={classes.calendar}>
      <Scheduler data={scheduleData} height="auto">
        <ViewState
          defaultCurrentDate={new Date()}
          defaultCurrentViewName="Month"
        />
        <MonthView />
        <DayView startDayHour={8} endDayHour={20} />
        <WeekView startDayHour={8} endDayHour={20} />

        <Toolbar />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <ConfirmationDialog />
        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm />
        <DateNavigator />
        <ViewSwitcher />
      </Scheduler>
    </Paper>
  );
}

export default Calendar;
