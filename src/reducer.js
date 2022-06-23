export default function redurer(state, action) {
  switch (action.type) {
    case "set_items": {
      return {
        ...state,
        items: state.items.concat(action.payload.items),
      };
    }

    case "done_task":
      console.log(action.idx);

      return {
        items: state.items.map((t) =>
          t.idTask === action.idx ? { ...t, completed: !t.completed } : t
        ),
      };

    case "delete_task":
      return {
        items: state.items.filter((t) => t.idTask !== action.idx),
      };

    default: {
      return state;
    }
  }
}
