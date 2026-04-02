const saveNote = async () => {
  alert("Clicked 🔥");

  if (!text) {
    alert("Enter something");
    return;
  }

  const token = localStorage.getItem("token");

  // 🔥 IMPORTANT CHECK
  if (!token) {
    alert("Please login again ❌");
    return;
  }

  try {
    await axios.post(
      API,
      { text },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Saved ✅");

  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Failed ❌");
  }
};