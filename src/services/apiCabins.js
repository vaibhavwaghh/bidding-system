import supabase from "./supaBase";

export async function getPlayers() {
  let { data, error } = await supabase
    .from("PLAYERS")
    .select("*")
    .order("playerorder", { ascending: true });
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  return data;
}

export async function deletePlayer(id) {
  const { data, error } = await supabase.from("PLAYERS").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  return data;
}

export async function getTeams() {
  let { data, error } = await supabase
    .from("Teams")
    .select("*")
    .order("teamOrder", { ascending: true });
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  return data;
}

export async function deleteTeam(id) {
  const { data, error } = await supabase.from("Teams").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  return data;
}

export async function getBookedPlayer(userNo) {
  let { data, error } = await supabase
    .from(`BoughtPlayersByuser${userNo}`)
    .select("*");
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  return data;
}

export async function deleteBookedPlayer(id) {
  const { data, error } = await supabase
    .from("BoughtPlayersByuser1")
    .delete()
    .eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  return data;
}

export async function updatePlayer(id, newBidAmount) {
  const { data, error } = await supabase
    .from("PLAYERS")
    .update({ bidAmount: newBidAmount })
    .eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Failed to update player");
  }
  return data;
}
export async function insertBookedPlayer(playerData, userNo) {
  try {
    const { data, error } = await supabase
      .from(`BoughtPlayersByuser${userNo}`)
      .insert(playerData);
    if (error) {
      console.error(error);
      throw new Error("Failed to insert player into bookedPlayer database");
    }
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to insert player into bookedPlayer database");
  }
}

export async function updateCurrentBoughtTeam(userNo, newExpense) {
  console.log("I AM FROM updateCurrentBoughtTeam");
  try {
    // Count the number of bought players for the user
    const { data: boughtPlayersCount, error: countError } = await supabase
      .from(`BoughtPlayersByuser${userNo}`)
      .select("count", { count: "exact" });

    if (countError) {
      console.error(countError);
      throw new Error("Failed to count bought players");
    }
    let count = boughtPlayersCount[0].count;

    // const { data: currBidAmount } = await supabase
    //   .from("PLAYERS")
    //   .select("bidAmount")
    //   .eq("playerorder", userNo);

    // let newExpense = currBidAmount[0].bidAmount;
    const { data: currexpense, error: updateError1 } = await supabase
      .from("Teams")
      .select("totalExpense")
      .eq("teamOrder", userNo);
    console.log(
      "THIS IS MY COUNT DATA , user no , new expense",
      count,
      userNo,
      newExpense,
      currexpense[0].totalExpense
    );
    let total = newExpense + currexpense[0].totalExpense;
    // Update the CurrentNumberOfPlayers in teams table
    const { data: updatedData, error: updateError } = await supabase
      .from("Teams")
      .update({
        CurrentNumberOfPlayers: count, // Assuming boughtPlayersCount is an array with a single object containing the count
        totalExpense: total,
      })
      .eq("teamOrder", userNo);

    if (updateError) {
      console.error(updateError);
      throw new Error("Failed to update currentBoughtPlayers");
    }

    return updatedData;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update currentBoughtPlayers");
  }
}

export async function insertAndDeletePlayer(currplayer, userNo) {
  console.log("THIS IS INSERT AND DELETE PLAYER", currplayer, userNo);
  try {
    // First, insert the player into the bookedPlayer database
    await insertBookedPlayer(currplayer, userNo); // You need to implement this function

    // Second, delete the player from the player database
    await deletePlayer(currplayer.id);
    await updateCurrentBoughtTeam(userNo, currplayer.bidAmount);
    // Return success message or handle accordingly
    return "Player inserted into bookedPlayer database and deleted from player database successfully";
  } catch (error) {
    console.error(error);
    throw new Error("Failed to insert and delete player");
  }
}
