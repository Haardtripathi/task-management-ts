

import { Task } from "../models/task.model";
import moment from "moment-timezone";

export const checkTaskTimeouts = async () => {
    const currentISTTime = moment().tz("Asia/Kolkata").toDate();

    const expiredTasks = await Task.find({
        status: { $ne: "Timeout" },
        deadline: { $lt: currentISTTime },
    });

    for (const task of expiredTasks) {
        task.status = "Timeout";
        await task.save();
    }
};
