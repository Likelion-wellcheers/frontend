export const fetchQuestionStatus = async (q_id) => {
    try {
      const response = await fetch(`/qna/question/${q_id}/`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.finish;
    } catch (error) {
      console.error('Fetch error:', error);
      return false; // 기본값으로 false를 반환
    }
  };