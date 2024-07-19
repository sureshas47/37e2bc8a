import * as React from "react";
import { styled } from "@mui/system";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { buttonClasses } from "@mui/base/Button";
import { Tab as BaseTab, tabClasses } from "@mui/base/Tab";
import axios from "axios";
import { useEffect, useState } from "react";
import CallItem from "./CallItem.jsx";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const red = {
  50: "#FFEFEF",
  100: "#FFCCCC",
  200: "#FF9999",
  300: "#FF6666",
  400: "#FF3333",
  500: "#FF0000",
  600: "#E50000",
  700: "#B20000",
  800: "#990000",
  900: "#750000",
};
const green = {
  50: "#E8F5E9",
  100: "#C8E6C9",
  200: "#A5D6A7",
  300: "#81C784",
  400: "#66BB6A",
  500: "#4CAF50",
  600: "#43A047",
  700: "#388E3C",
  800: "#2E7D32",
  900: "#1B5E20",
};

const Tab = styled(BaseTab)`
  font-family: "IBM Plex Sans", sans-serif;
  color: #fff;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 100%;
  padding: 10px 12px;
  margin: 6px;
  border: none;
  border-radius: 7px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    outline: 3px solid ${blue[200]};
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: ${blue[600]};
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  padding: 10px 12px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  border-radius: 12px;
  opacity: 0.6;
  max-height: 450px;
  overflow-y: auto; 
  `
);

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  background-color: ${blue[500]};
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  `
);

const ArchiveButton = styled("button")`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #e5eaf2;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: ${blue[50]};
  }
`;

export default function FullWidthTabs() {
  const [activityCalls, setActivityCalls] = useState([]);
  const [alert, setAlert] = useState({});
  const BASE_URL = "https://aircall-backend.onrender.com";

  const getAllCalls = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/activities`);
      setActivityCalls(response.data);
    } catch (error) {
      console.log("Error while fetching calls", error);
    }
  };

  useEffect(() => {
    getAllCalls();
  }, []);

  const archivedCalls = activityCalls.filter(
    (activityCall) => activityCall.is_archived === true // filter archived calls
  );

  const nonArchivedCalls = activityCalls.filter(
    (activityCall) => activityCall.is_archived === false // filter nonArchived calls
  );

  const missedCalls = activityCalls.filter(
    (activityCall) => activityCall.call_type === "missed" // filter missed calls
  );

  const handleArchiveCalls = async () => {
    const updateAllCalls = activityCalls.filter((call) => !call.is_archived);
    try {
      updateAllCalls.map(async (call) => {
        const response = await axios.patch(
          `${BASE_URL}/activities/${call.id}`,
          {
            is_archived: true,
          }
        );

        if (response.status === 200) {
          getAllCalls();
          setAlert({
            isAlert: true,
            msg: response.data,
            severity: "success",
          });
          setTimeout(() => {
            setAlert({ isAlert: false });
          }, 2000);
        }
      });
    } catch (error) {
      setAlert({
        isAlert: true,
        msg: response.data,
        severity: "error",
      });
      setTimeout(() => {
        setAlert({ isAlert: false });
      }, 2000);
    }
  };

  // unArchive calls
  const handleUnArchiveCalls = async () => {
    try {
      const response = await axios.patch(`${BASE_URL}/reset`);
      if (response.status === 200) {
        getAllCalls();
        setAlert({
          isAlert: true,
          msg: response.data,
          severity: "success",
        });
        setTimeout(() => {
          setAlert({ isAlert: false });
        }, 2000);
      }
    } catch (error) {
      setAlert({
        isAlert: true,
        msg: response.data,
        severity: "error",
      });
      setTimeout(() => {
        setAlert({ isAlert: false });
      }, 2000);
      console.log("Error while unarchiving calls", error);
    }
  };

  const messageParser = (message) => {
    setAlert({
      isAlert: true,
      msg: message,
      severity: "success",
    });
    setTimeout(() => {
      setAlert({ isAlert: false });
    }, 2000);
  };

  const updateCallInState = (updatedCall) => {
    setActivityCalls((prevCalls) =>
      prevCalls.map((call) => (call.id === updatedCall.id ? updatedCall : call))
    );
  };

  return (
    <Tabs defaultValue={0}>
      <TabsList>
        <Tab value={0}>Activity</Tab>
        <Tab value={1}>Inbox</Tab>
        <Tab value={2}>Archived</Tab>
      </TabsList>
      <TabPanel value={0}>
        {nonArchivedCalls.length > 0 ? (
          <>
            <Stack sx={{ width: "100%" }} spacing={2}>
              {alert.isAlert && (
                <Alert severity={alert.severity} sx={{ marginBottom: "10px" }}>
                  {alert.msg}
                </Alert>
              )}
            </Stack>
            <ArchiveButton onClick={handleArchiveCalls}>
              <ArchiveIcon style={{ color: red[600], marginRight: "10px" }} />{" "}
              Archive All Calls
            </ArchiveButton>
            {nonArchivedCalls.map((nonArchivedCall) => (
              <CallItem
                key={nonArchivedCall.id}
                activityCall={nonArchivedCall}
                messageParser={messageParser}
                updateCallInState={updateCallInState}
              />
            ))}
          </>
        ) : (
          <div>No calls</div>
        )}
      </TabPanel>
      <TabPanel value={1}>
        {missedCalls.length > 0 ? (
          <>
            {missedCalls.map((missedCall) => (
              <CallItem key={missedCall.id} activityCall={missedCall} />
            ))}
          </>
        ) : (
          <div>No Missed calls</div>
        )}
      </TabPanel>
      <TabPanel value={2}>
        {archivedCalls.length > 0 ? (
          <>
            <Stack sx={{ width: "100%" }} spacing={2}>
              {alert.isAlert && (
                <Alert severity={alert.severity} sx={{ marginBottom: "10px" }}>
                  {alert.msg}
                </Alert>
              )}
            </Stack>
            <ArchiveButton onClick={handleUnArchiveCalls}>
              <UnarchiveIcon
                style={{ color: green[600], marginRight: "10px" }}
              />{" "}
              Unarchive All Calls
            </ArchiveButton>
            {archivedCalls.map((archivedCall) => (
              <CallItem
                key={archivedCall.id}
                activityCall={archivedCall}
                messageParser={messageParser}
                updateCallInState={updateCallInState}
              />
            ))}
          </>
        ) : (
          <div>No archived calls</div>
        )}
      </TabPanel>
    </Tabs>
  );
}
