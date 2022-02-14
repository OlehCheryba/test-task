const response = [
  {
    id: 1293487,
    name: "KCRW", // radio station callsign
    tracks: [{ timestp: "2021-04-08", trackName: "Peaches" }],
  },
  {
    id: 12923,
    name: "KQED",
    tracks: [
      { timestp: "2021-04-09", trackName: "Savage" },
      { timestp: "2021-04-09", trackName: "Savage (feat. Beyonce)" },
      { timestp: "2021-04-08", trackName: "Savage" },
      { timestp: "2021-04-08", trackName: "Savage" },
      { timestp: "2021-04-08", trackName: "Savage" },
    ],
  },
  {
    id: 4,
    name: "WNYC",
    tracks: [
      { timestp: "2021-04-09", trackName: "Captain Hook" },
      { timestp: "2021-04-08", trackName: "Captain Hook" },
      { timestp: "2021-04-07", trackName: "Captain Hook" },
    ],
  },
];

const getAllTracksList = (tracksByStations) =>
  tracksByStations.reduce((acc, station) => acc.concat(station.tracks), []);

const getTracksSpinnedByDays = (tracksList) => {
  const tracksSpinnedByDays = tracksList.reduce(
    (acc, { timestp, trackName }) => {
      const tracksByDay = acc.find(
        (tracksByDay) => tracksByDay.timestp === timestp
      );

      if (tracksByDay) {
        const track = tracksByDay.tracks.find(
          (track) => track.trackName === trackName
        );

        if (track) {
          track.spins++;
        } else {
          tracksByDay.tracks.push({ trackName, spins: 1 });
        }
      } else {
        acc.push({
          timestp,
          tracks: [{ trackName, spins: 1 }],
        });
      }

      return acc;
    },
    []
  );

  return tracksSpinnedByDays.sort(
    (a, b) => new Date(a.timestp) - new Date(b.timestp)
  );
};

const getTooltipString = (tracks) =>
  tracks.reduce(
    (acc, { trackName, spins }, index) =>
      `${acc}${index !== 0 ? ", " : ""}${trackName} (${spins})`,
    ""
  );

const getFormattedTracksByDayForChart = (tracksByStations) => {
  const allTracksList = getAllTracksList(tracksByStations);

  const tracksSpinnedByDays = getTracksSpinnedByDays(allTracksList);

  return tracksSpinnedByDays.map(({ timestp, tracks }) => {
    const totalSpins = tracks.reduce((acc, { spins }) => acc + spins, 0);

    return {
      x: timestp,
      y: totalSpins,
      tooltip: getTooltipString(tracks),
    };
  });
};

getFormattedTracksByDayForChart(response);
