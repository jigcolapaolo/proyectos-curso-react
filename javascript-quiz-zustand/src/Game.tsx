import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useQuestionsStore } from "./store/questions";
import { type Question as QuestionType } from "./types.d";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer";

// Puede ir dentro o fuera de Question. Recomendable dejarla fuera
const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info;
  // Usuario no ha seleccionado nada
  if (userSelectedAnswer == null) return "transparent";
  // Si ya selecciono una opcion pero el index actual no fue el seleccionado..
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return "transparent";
  // Si es la solucion correcta
  if (index === correctAnswer) return "green";
  // Si esta es la seleccion del usuario pero no es correcta
  if (index === userSelectedAnswer) return "red";

  return "transparent";
};

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  return (
    <Card
      variant="outlined"
      sx={{ bgcolor: "#222", p: 2, textAlign: "left", marginTop: 4 }}
    >
      <Typography variant="h5">{info.question}</Typography>
      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: "#333" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              sx={{ backgroundColor: getBackgroundColor(info, index) }}
              onClick={createHandleClick(index)}
            >
              <ListItemText primary={answer} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const nextQuestion = useQuestionsStore((state) => state.nextQuestion);
  const previousQuestion = useQuestionsStore((state) => state.previousQuestion);

  const questionInfo = questions[currentQuestion];

  return (
    <>
      <div>
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <IconButton
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            <ArrowBackIosNew />
          </IconButton>
            Pregunta: {currentQuestion + 1}/{questions.length}
          <IconButton
            onClick={nextQuestion}
            disabled={currentQuestion === questions.length - 1}
          >
            <ArrowForwardIos />
          </IconButton>
        </Stack>
      </div>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
};
