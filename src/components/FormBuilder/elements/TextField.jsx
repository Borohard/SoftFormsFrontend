//Material UI Components
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
//Icons
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import FileCopyIcon from '@material-ui/icons/FileCopy';

//Form Elements
import { formEl } from "../constants";

const TextFieldInput = ({ item, handleValue, deleteEl, handleRequired, handleElType,duplicateElement }) => {
  return (
      <div className="text-center shadow-2xl shadow-fuchsia-200 hover:shadow-2xl hover:shadow-fuchsia-400  rounded-md">
        <Paper elevation={1}>
          <Box className="text-center">
            <DragIndicatorIcon className="transform: rotate-90 cursor-all-scroll"/>
          </Box>
          <Box className="p-3">
            <Grid container spacing={1}>
              <Grid item xs={9} className="p-3">
                <TextField className="px-2 pt-2 h-10 rounded-md w-full focus:outline-fuchsia-800"
                           defaultValue={item.title}
                           onChange={(e) => handleValue(item.id, e)}
                           fullWidth
                           required={item.isRequired}
                           placeholder="Введите вопрос"
                />
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="el-type-label" color="primary">Тип вопроса</InputLabel>
                  <Select
                      labelId="el-type-label"
                      id="el-type"
                      label="Тип вопроса"
                      value={item.questionType}
                      onChange={(e)=>handleElType(item.id,e.target.value)}
                  >
                    {formEl &&
                        formEl.map((el, key) => (
                            <MenuItem key={key} value={el.value}>
                              {el.label}
                            </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Divider light />
          <FormGroup row className="p-1 ml-2">
            <Tooltip title="Удалить вопрос" aria-label="delete-element" >
              <IconButton
                  color="primary"
                  aria-label="delete-element"
                  onClick={() => deleteEl(item.id)}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Копировать тип вопроса" aria-label="duplicate-element">
              <IconButton
                  color="primary"
                  aria-label="duplicate-element"
                  onClick={() => duplicateElement(item.id, item.questionType)}
              >
                <FileCopyIcon />
              </IconButton>
            </Tooltip>


            <FormControlLabel className="ml-2"
                              control={
                                <Switch
                                    color="secondary"
                                    checked={item.isRequired}
                                    onChange={() => handleRequired(item.id)}
                                    name="required-field"
                                />
                              }
                              label="Обязательный вопрос"
            />
          </FormGroup>
        </Paper>
      </div>
  );
};

export default TextFieldInput;
