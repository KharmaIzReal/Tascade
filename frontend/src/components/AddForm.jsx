import taskHelper from "../features/tasks/taskHelper";
import { Add, TaskSharp } from "@mui/icons-material";
import {
  Box,
  Button,
  Fab,
  FormControl,
  Input,
  InputAdornment,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, getTasks } from "../features/tasks/taskSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [breakdown, setBreakdown] = useState("");

  const [formData, setFormData] = useState({
    taskItem: "",
    priority: "low",
    aiPlan: [],
  });

  const { taskItem, priority, aiPlan } = formData;

  const handleAISuggestion = async () => {
    if (!taskItem) {
      toast.error("Enter a task first");
      return;
    }

    try {
      const result = await taskHelper.suggestPriority(taskItem);

      setFormData({
        ...formData,
        priority: result.priority,
      });

      toast.success("AI suggested: " + result.priority);
    } catch (err) {
      toast.error("AI suggestion failed");
    }
  };

  const handleAIBreakdown = async () => {
    if (!taskItem) {
      toast.error("Enter a task first");
      return;
    }

    try {
      const result = await taskHelper.breakdownTask(taskItem);

      setBreakdown(result.breakdown);
      const planArray = result.breakdown
        .split("\n")
        .map((item) => item.replace(/^[-•\d.]+\s*/, "").trim())
        .filter((item) => item);

      setFormData({
        ...formData,
        aiPlan: planArray,
      });
      toast.success("AI breakdown generated");
    } catch (err) {
      toast.error("AI breakdown failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const taskData = { taskItem, priority, aiPlan };
    if (!taskItem) {
      toast.error("Status 400: Please fill all fields");
    }
    dispatch(addTask(taskData));
    setFormData({
      taskItem: "",
      priority: "low",
      aiPlan: [],
    });

    setBreakdown("");

    dispatch(getTasks());
    navigate("/");
    setOpen(false);
  };

  return (
    <>
      <Tooltip
        onClick={() => {
          setBreakdown("");
          setOpen(true);
        }}
        title="Add"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <Add />
        </Fab>
      </Tooltip>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setBreakdown("");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{
            bgcolor: "lightcyan",
            display: "flex",
            gap: 5,
            flexDirection: "column",
            width: { xs: "90%", sm: "50%", md: "50%", lg: "30%" },
            borderRadius: 5,
          }}
          p={5}
        >
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Add a New Task
          </Typography>
          <FormControl variant="standard">
            <Input
              type="text"
              placeholder="Task Text"
              name="taskItem"
              value={taskItem}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <TaskSharp />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth>
            <select
              name="priority"
              label="Priority"
              placeholder="Priority"
              onChange={handleChange}
              style={{ backgroundColor: "transparent", padding: 5 }}
            >
              <option component="option" value="">
                Priority
              </option>
              <option component="option" value="low">
                Low
              </option>
              <option component="option" value="high">
                High
              </option>
              <option component="option" value="urgent">
                Urgent
              </option>
            </select>
          </FormControl>
          {breakdown && (
            <Box sx={{ bgcolor: "white", p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle1">AI Breakdown</Typography>
              <Typography sx={{ whiteSpace: "pre-line", fontSize: 14 }}>
                {breakdown}
              </Typography>
            </Box>
          )}
          <FormControl>
            <Button variant="outlined" onClick={handleAISuggestion}>
              AI Priority
            </Button>
            <Button variant="outlined" onClick={handleAIBreakdown}>
              AI Breakdown
            </Button>
            <Button variant="contained" type="submit">
              Add Task
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </>
  );
};

export default AddForm;
