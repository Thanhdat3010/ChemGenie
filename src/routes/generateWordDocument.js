import { Document, Packer, Paragraph, TextRun, AlignmentType, TabStopPosition, TabStopType, SectionType } from 'docx';
import { saveAs } from 'file-saver';

export const generateWordDocument = async (questions, headerInfo, quizTitle) => {
  const multipleChoiceQuestions = questions.filter(q => q.type === 'multiple-choice');
  const trueFalseQuestions = questions.filter(q => q.type === 'true-false');
  const shortAnswerQuestions = questions.filter(q => q.type === 'short-answer');

  const doc = new Document({
    sections: [
      // Định dạng 1 - Không có competency
      {
        properties: {},
        children: [
          // Header
          new Paragraph({
            children: [
              new TextRun({ text: headerInfo.mainTitle, bold: true }),
              new TextRun({ text: '\t' }),
              new TextRun({ text: headerInfo.subTitle, bold: true }),
            ],
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Môn: ${headerInfo.subject}`, bold: true }),
              new TextRun({ text: '\t' }),
              new TextRun({ text: `Thời gian làm bài: ${headerInfo.examTime} (không kể thời gian giao đề)`, italics: true }),
            ],
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "(Đề thi gồm ....trang, có ... câu)" }),
              new TextRun({ text: '\t' }),
              new TextRun({ text: "Ngày thi :.../.../...."}),
            ],
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          }),
          new Paragraph({ children: [new TextRun({ text: " " })] }),
          new Paragraph({
            children: [new TextRun({ text: "Họ và tên thí sinh:.......................................................", bold: true })],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [new TextRun({ text: "Số báo danh: ............................................................", bold: true })],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({ children: [new TextRun({ text: " " })] }),

          // Multiple Choice Section
          new Paragraph({
            children: [
              new TextRun({ 
                text: `PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn. Thí sinh trả lời từ câu 1 đến câu ${multipleChoiceQuestions.length}. Mỗi câu hỏi thí sinh chỉ chọn một phương án.`,
                bold: true 
              })
            ],
            alignment: AlignmentType.LEFT,
          }),
          ...multipleChoiceQuestions.flatMap((question, index) => [
            new Paragraph({
              children: [
                new TextRun({ text: `Câu ${index + 1}: `, bold: true }),
                new TextRun({ text: question.question }),
              ],
              alignment: AlignmentType.LEFT,
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'A.', bold: true }),
                new TextRun(` ${question.options[0]}`),
                new TextRun({ text: '\t' }),
                new TextRun({ text: 'B.', bold: true }),
                new TextRun(` ${question.options[1]}`),
              ],
              tabStops: [{ type: TabStopType.LEFT, position: TabStopPosition.MAX / 2 }],
            }),
            new Paragraph({
              children: [
                new TextRun({ text: 'C.', bold: true }),
                new TextRun(` ${question.options[2]}`),
                new TextRun({ text: '\t' }),
                new TextRun({ text: 'D.', bold: true }),
                new TextRun(` ${question.options[3]}`),
              ],
              tabStops: [{ type: TabStopType.LEFT, position: TabStopPosition.MAX / 2 }],
            }),
          ]),

          // True/False Section
          ...(trueFalseQuestions.length > 0 ? [
            new Paragraph({ children: [new TextRun({ text: " " })] }),
            new Paragraph({
              children: [
                new TextRun({ 
                  text: `PHẦN II. Câu trắc nghiệm đúng sai. Thí sinh trả lời từ câu ${multipleChoiceQuestions.length + 1} đến câu ${multipleChoiceQuestions.length + trueFalseQuestions.length}. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn đúng hoặc sai.`,
                  bold: true 
                })
              ],
              alignment: AlignmentType.LEFT,
            }),
            ...trueFalseQuestions.flatMap((question, index) => [
              new Paragraph({
                children: [
                  new TextRun({ text: `Câu ${multipleChoiceQuestions.length + index + 1}: `, bold: true }),
                  new TextRun({ text: question.question }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'a) ', bold: true }),
                  new TextRun({ text: question.options[0] }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'b) ', bold: true }),
                  new TextRun({ text: question.options[1] }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'c) ', bold: true }),
                  new TextRun({ text: question.options[2] }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'd) ', bold: true }),
                  new TextRun({ text: question.options[3] }),
                ],
                alignment: AlignmentType.LEFT,
              }),
            ]),
          ] : []),

          // Short Answer Section
          ...(shortAnswerQuestions.length > 0 ? [
            new Paragraph({ children: [new TextRun({ text: " " })] }),
            new Paragraph({
              children: [
                new TextRun({ 
                  text: `PHẦN III: Câu trắc nghiệm yêu cầu trả lời ngắn. Thí sinh trả lời từ câu ${multipleChoiceQuestions.length + trueFalseQuestions.length + 1} đến câu ${questions.length}.`,
                  bold: true 
                })
              ],
              alignment: AlignmentType.LEFT,
            }),
            ...shortAnswerQuestions.flatMap((question, index) => [
              new Paragraph({
                children: [
                  new TextRun({ text: `Câu ${multipleChoiceQuestions.length + trueFalseQuestions.length + index + 1}: `, bold: true }),
                  new TextRun({ text: question.question }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [new TextRun({ text: `Đáp án: `, bold: true })],
                alignment: AlignmentType.LEFT,
              }),
            ]),
          ] : []),

          // Footer
          new Paragraph({ children: [new TextRun({ text: " " })] }),
          new Paragraph({ children: [new TextRun({ text: " " })] }),
          new Paragraph({
            children: [new TextRun({ text: "HẾT", bold: true })],
            alignment: AlignmentType.CENTER,
          }),
        ],
      },

      // Định dạng 2 - Có competency
      {
        properties: {
          type: SectionType.NEXT_PAGE,
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: headerInfo.mainTitle, bold: true }),
              new TextRun({ text: '\t' }),
              new TextRun({ text: headerInfo.subTitle, bold: true }),
            ],
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Môn: ${headerInfo.subject}`, bold: true }),
              new TextRun({ text: '\t' }),
              new TextRun({ text: `Thời gian làm bài: ${headerInfo.examTime} (không kể thời gian giao đề)`, italics: true }),
            ],
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "(Đề thi gồm ....trang, có ... câu)" }),
              new TextRun({ text: '\t' }),
              new TextRun({ text: "Ngày thi :.../.../...."}),
            ],
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
          }),
          new Paragraph({ children: [new TextRun({ text: " " })] }),
          new Paragraph({
            children: [new TextRun({ text: "Họ và tên thí sinh:.......................................................", bold: true })],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({
            children: [new TextRun({ text: "Số báo danh: ............................................................", bold: true })],
            alignment: AlignmentType.LEFT,
          }),
          new Paragraph({ children: [new TextRun({ text: " " })] }),

          // Multiple Choice Section
          ...(multipleChoiceQuestions.length > 0 ? [
            new Paragraph({
              children: [
                new TextRun({ 
                  text: `PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn. Thí sinh trả lời từ câu 1 đến câu ${multipleChoiceQuestions.length}. Mỗi câu hỏi thí sinh chỉ chọn một phương án.`,
                  bold: true 
                })
              ],
              alignment: AlignmentType.LEFT,
            }),
            ...multipleChoiceQuestions.flatMap((question, index) => [
              new Paragraph({
                children: [
                  new TextRun({ text: `Câu ${index + 1} (${question.competency}): `, bold: true }),
                  new TextRun({ text: question.question }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'A.', bold: true }),
                  new TextRun(` ${question.options[0]}`),
                  new TextRun({ text: '\t' }),
                  new TextRun({ text: 'B.', bold: true }),
                  new TextRun(` ${question.options[1]}`),
                ],
                tabStops: [{ type: TabStopType.LEFT, position: TabStopPosition.MAX / 2 }],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'C.', bold: true }),
                  new TextRun(` ${question.options[2]}`),
                  new TextRun({ text: '\t' }),
                  new TextRun({ text: 'D.', bold: true }),
                  new TextRun(` ${question.options[3]}`),
                ],
                tabStops: [{ type: TabStopType.LEFT, position: TabStopPosition.MAX / 2 }],
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'Đáp án: ', bold: true }),
                  new TextRun({ text: question.correctAnswer }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'Giải thích: ', bold: true }),
                  new TextRun({ text: question.explain }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'Đánh giá năng lực: ', bold: true }),
                  new TextRun({ text: question.competencyExplanation }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({ children: [new TextRun({ text: " " })] }),
            ]),
          ] : []),

          // True/False Section
          ...(trueFalseQuestions.length > 0 ? [
            new Paragraph({ children: [new TextRun({ text: " " })] }),
            new Paragraph({
              children: [
                new TextRun({ 
                  text: `PHẦN II. Câu trắc nghiệm đúng sai. Thí sinh trả lời từ câu ${multipleChoiceQuestions.length + 1} đến câu ${multipleChoiceQuestions.length + trueFalseQuestions.length}. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn đúng hoặc sai.`,
                  bold: true 
                })
              ],
              alignment: AlignmentType.LEFT,
            }),
            ...trueFalseQuestions.flatMap((question, index) => [
              new Paragraph({
                children: [
                  new TextRun({ text: `Câu ${multipleChoiceQuestions.length + index + 1}: `, bold: true }),
                  new TextRun({ text: question.question }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'a) ', bold: true }),
                  new TextRun({ text: `${question.options[0]} (${question.competencies[0]})` }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'b) ', bold: true }),
                  new TextRun({ text: `${question.options[1]} (${question.competencies[1]})` }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'c) ', bold: true }),
                  new TextRun({ text: `${question.options[2]} (${question.competencies[2]})` }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'd) ', bold: true }),
                  new TextRun({ text: `${question.options[3]} (${question.competencies[3]})` }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'Đáp án: ', bold: true }),
                  ...question.correctAnswer.map((ans, i) => 
                    new TextRun({ text: `${String.fromCharCode(97 + i)}) ${ans}  ` })
                  ),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({ children: [new TextRun({ text: " " })] }),
            ]),
          ] : []),

          // Short Answer Section
          ...(shortAnswerQuestions.length > 0 ? [
            new Paragraph({ children: [new TextRun({ text: " " })] }),
            new Paragraph({
              children: [
                new TextRun({ 
                  text: `PHẦN III: Câu trắc nghiệm yêu cầu trả lời ngắn. Thí sinh trả lời từ câu ${multipleChoiceQuestions.length + trueFalseQuestions.length + 1} đến câu ${questions.length}.`,
                  bold: true 
                })
              ],
              alignment: AlignmentType.LEFT,
            }),
            ...shortAnswerQuestions.flatMap((question, index) => [
              new Paragraph({
                children: [
                  new TextRun({ 
                    text: `Câu ${multipleChoiceQuestions.length + trueFalseQuestions.length + index + 1} (${question.competency}): `,
                    bold: true 
                  }),
                  new TextRun({ text: question.question }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'Đáp án: ', bold: true }),
                  new TextRun({ text: question.correctAnswer }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun({ text: 'Đánh giá năng lực: ', bold: true }),
                  new TextRun({ text: question.competencyExplanation }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({ children: [new TextRun({ text: " " })] }),
            ]),
          ] : []),

          // Footer
          new Paragraph({ children: [new TextRun({ text: " " })] }),
          new Paragraph({ children: [new TextRun({ text: " " })] }),
          new Paragraph({
            children: [new TextRun({ text: "HẾT", bold: true })],
            alignment: AlignmentType.CENTER,
          }),
        ],
      },
    ],
  });

  doc.coreProperties.keywords = `answer_file:${quizTitle}_answers.docx`;
  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${quizTitle}.docx`);
};

export const generateAnswerDocument = async (questions, quizTitle) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [new TextRun({ text: "Đáp án", bold: true })],
          alignment: AlignmentType.CENTER,
        }),
        // Multiple Choice Answers
        new Paragraph({
          children: [new TextRun({ text: "PHẦN I. TRẮC NGHIỆM", bold: true })],
          alignment: AlignmentType.LEFT,
        }),
        ...questions
          .filter(q => q.type === 'multiple-choice')
          .map((question, index) => {
            const correctAnswerIndex = question.options.indexOf(question.correctAnswer);
            const correctAnswerLabel = String.fromCharCode(65 + correctAnswerIndex);
            return new Paragraph({
              children: [
                new TextRun({ text: `Câu ${index + 1}: `, bold: true }),
                new TextRun({ text: correctAnswerLabel }),
              ],
            });
          }),

        // True/False Answers
        ...(questions.some(q => q.type === 'true-false') ? [
          new Paragraph({
            children: [new TextRun({ text: "PHẦN II. ĐÚNG/SAI", bold: true })],
            alignment: AlignmentType.LEFT,
          }),
          ...questions
            .filter(q => q.type === 'true-false')
            .map((question, index) => {
              const startIndex = questions.filter(q => q.type === 'multiple-choice').length;
              return new Paragraph({
                children: [
                  new TextRun({ text: `Câu ${startIndex + index + 1}: `, bold: true }),
                  ...question.correctAnswer.map((ans, i) => 
                    new TextRun({ text: `${String.fromCharCode(97 + i)}) ${ans}  ` })
                  ),
                ],
              });
            })
        ] : []),

        // Short Answer Answers
        ...(questions.some(q => q.type === 'short-answer') ? [
          new Paragraph({
            children: [new TextRun({ text: "PHẦN III. TRẢ LỜI NGẮN", bold: true })],
            alignment: AlignmentType.LEFT,
          }),
          ...questions
            .filter(q => q.type === 'short-answer')
            .map((question, index) => {
              const startIndex = questions.filter(q => 
                q.type === 'multiple-choice' || q.type === 'true-false'
              ).length;
              return new Paragraph({
                children: [
                  new TextRun({ text: `Câu ${startIndex + index + 1}: `, bold: true }),
                  new TextRun({ text: question.correctAnswer }),
                ],
              });
            })
        ] : []),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${quizTitle}_answers.docx`);
};
