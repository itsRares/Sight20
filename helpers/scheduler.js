import * as Notifications from "expo-notifications";

const localNotificationText = {
  title: "It's time to look up!",
  body: "Give your eyes a 20 second break",
};

export const calcScheduler = async (
  running,
  scheduleType,
  scheduleInterval,
  schedule
) => {
  if (running) {
    switch (scheduleType) {
      case "Forever":
        await runForever();
        break;
      case "Schedule":
        await runSchedule(schedule);
        break;
      case "Interval":
        await runInterval(scheduleInterval);
        break;
      default:
        await runForever();
        break;
    }
  } else {
    await Notifications.cancelAllScheduledNotificationsAsync();
  }
};

const runForever = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  //First schedule first 20min Reminder
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "It's time to look up!",
      body: "Give your eyes a 20 second break",
    },
    trigger: {
      seconds: 60 * 20,
      repeats: false,
    },
  });

  //Then Schedule repeating 20min 20 seconds reminders
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "It's time to look up!",
      body: "Give your eyes a 20 second break",
    },
    trigger: {
      seconds: 60 * 20 + 20,
      repeats: true,
    },
  });
};

const runInterval = async (amt) => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  //First schedule first 20min Reminder
  await Notifications.scheduleNotificationAsync({
    content: localNotificationText,
    trigger: {
      seconds: 60 * 20,
      repeats: false,
    },
  });

  console.log({
    seconds: 60 * 20,
    repeats: false,
  });

  //Then Schedule interval amount 20min 20 seconds reminders - 2
  let amtTemp = amt - 1;
  let finalAmt = 0;
  for (let ii = 1; ii <= amtTemp; ii++) {
    finalAmt = 60 * 20 * (ii + 1) + 20 * ii;
    await Notifications.scheduleNotificationAsync({
      content: localNotificationText,
      trigger: {
        seconds: finalAmt,
        repeats: false,
      },
    });
  }

  //Then schedule ending reminder
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Final Reminder! It's time to look up",
      body: "Give your eyes a 20 second break",
    },
    trigger: {
      seconds: finalAmt + 1220,
      repeats: false,
    },
  });
};

const runSchedule = async (schedule) => {
  await Notifications.cancelAllScheduledNotificationsAsync();

  let days = schedule.days;
  let startTime = new Date(schedule.startTime);
  let endTime = new Date(schedule.endTime);
  for (let ii = 0; ii < days.length; ii++) {
    const day = parseInt(days[ii]);

    // Schedules initial notification
    await Notifications.scheduleNotificationAsync({
      content: localNotificationText,
      trigger: {
        weekday: day,
        hour: startTime.getHours(),
        minute: startTime.getMinutes(),
        repeats: true,
      },
    });

    await scheduleInbetweenDates(startTime, endTime, day);
  }
};

const scheduleInbetweenDates = async (startTime, endTime, day) => {
  //calc amount of loops needed
  let calcTime = Math.floor(
    (endTime.getTime() / 1000 - (startTime.getTime() / 1000).toFixed(0)) / 1220
  );

  let finalAmt = 0;
  let tempTime = new Date(startTime);
  for (let ii = 1; ii <= calcTime; ii++) {
    finalAmt = 60 * 20 + 20;
    tempTime.setTime(tempTime.getTime() + finalAmt * 1000);

    await Notifications.scheduleNotificationAsync({
      content: localNotificationText,
      trigger: {
        weekday: day,
        hour: tempTime.getHours(),
        minute: tempTime.getMinutes(),
        second: tempTime.getSeconds(),
        repeats: true,
      },
    });
  }
};
