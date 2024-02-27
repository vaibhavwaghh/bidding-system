import supabase from "./supaBase";

export async function getPlayers() {
  let { data, error } = await supabase.from("PLAYERS").select("*");
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
  let { data, error } = await supabase.from("Teams").select("*");
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

export async function getBookedPlayer() {
  let { data, error } = await supabase.from("BoughtPlayers").select("*");
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  return data;
}

export async function deleteBookedPlayer(id) {
  const { data, error } = await supabase
    .from("BoughtPlayers")
    .delete()
    .eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("DATA NOT LOADED");
  }
  return data;
}
