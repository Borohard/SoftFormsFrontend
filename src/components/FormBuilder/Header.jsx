
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";

const Header = ({ title, description, setTitle, setDescription }) => {
  return (
    <div className="container shadow-2xl shadow-fuchsia-200 hover:shadow-2xl hover:shadow-fuchsia-300">
      <Box className="mb-3">
        <Paper>

          <TextField className="mt-3.5 px-8 w-full "
            value={title}

            onChange={(e) => setTitle(e.target.value)}
            variant="standard"
            placeholder="Заголовок опроса"
            name="title"
          />
          <TextField className="px-8 w-full pt-3"
            name="description"
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="standard"
            placeholder="Описание опроса"
            sx={{ mb: 2 }}
            multiline
            minRows={2}
          />
        </Paper>
      </Box>
    </div>
  );
};

export default Header;
