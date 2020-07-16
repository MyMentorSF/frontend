import React, { useState } from "react";
import { makeStyles, Container } from "@material-ui/core";
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
  ConfirmationDialog,
  Resources,
} from "@devexpress/dx-react-scheduler-material-ui";

const useStyles = makeStyles((theme) => ({
  calendar: {
    width: "60em",
    height: "100%",
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

const resourcesData = [
  {
    text: "Room 101",
    id: 1,
  },
  {
    text: "Room 102",
    id: 2,
  },
  {
    text: "Room 103",
    id: 3,
  },
  {
    text: "Meeting room",
    id: 4,
  },
  {
    text: "Conference hall",
    id: 5,
  },
];

export const mentors = [
  {
    text: "Andrew Glover",
    id: 1,
    color: "#7E57C2",
  },
  {
    text: "Arnie Schwartz",
    id: 2,
    color: "#FF7043",
  },
  {
    text: "John Heart",
    id: 3,
    color: "#E91E63",
  },
  {
    text: "Taylor Riley",
    id: 4,
    color: "#E91E63",
  },
  {
    text: "Brad Farkus",
    id: 5,
    color: "#AB47BC",
  },
  {
    text: "Arthur Miller",
    id: 6,
    color: "#FFA726",
  },
];

const overlay = ({ children, style, ...restProps }) => (
  <AppointmentForm.Overlay
    {...restProps}
    style={{
      ...style,
      width: "100%",
    }}
    fullSize={false}
  >
    {children}
  </AppointmentForm.Overlay>
);

const layout = ({ children, style, ...restProps }) => (
  <AppointmentForm.Layout
    {...restProps}
    style={{
      ...style,
      width: "100%",
    }}
    fullSize={false}
    isRecurrence={false}
  >
    {children}
  </AppointmentForm.Layout>
);

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChangeGuestEmail = (nextValue) => {
    onFieldChange({ guestEmail: nextValue });
  };

  const onCustomFieldChangeHostEmail = (nextValue) => {
    onFieldChange({ hostEmail: nextValue });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <AppointmentForm.Label text="Host Email" type="title" />
      <AppointmentForm.TextEditor
        value={appointmentData.hostEmail}
        onValueChange={onCustomFieldChangeHostEmail}
        placeholder="Host Email"
      />
      <AppointmentForm.Label text="Guest Email" type="title" />
      <AppointmentForm.TextEditor
        value={appointmentData.guestEmail}
        onValueChange={onCustomFieldChangeGuestEmail}
        placeholder="Guest Email"
      />
    </AppointmentForm.BasicLayout>
  );
};

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === "multilineTextEditor") {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

function Calendar() {
  const classes = useStyles();
  const [scheduleData, updateSchedule] = useState(schedulerData);
  const [resources, updateResources] = useState([
    { fieldName: "roomId", title: "Room", instances: resourcesData },
    { fieldName: "mentors", title: "Mentor", instances: mentors },
  ]);

  function commitChanges({ added, changed, deleted }) {
    updateSchedule((prevState) => {
      let data = prevState;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }]; // Push to ddb everything cept id and guestConfirmed
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
      <Scheduler data={scheduleData} height="660">
        <ViewState
          defaultCurrentDate={new Date()}
          defaultCurrentViewName="Month"
        />
        <MonthView />
        <DayView />
        <WeekView />

        <Toolbar />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <ConfirmationDialog ignoreCancel={true} />
        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton />
        <AppointmentForm
          messages={{
            detailsLabel: "Appointment Title",
            moreInformationLabel: "Summary",
          }}
          overlayComponent={overlay}
          layoutComponent={layout}
          basicLayoutComponent={BasicLayout}
          textEditorComponent={TextEditor}
        />
        <Resources data={resources} mainResourceName="roomId" />
        <DateNavigator />
        <ViewSwitcher />
      </Scheduler>
    </Paper>
  );
}

export default Calendar;
