function Filter() {
  return (
      <div className="flex items-center gap-4 p-4 w-full max-w-5xl mx-auto">
        {/* Let the dropdown fill available space */}
        <select className="select select-bordered flex-1">
          <option disabled selected>
            Sektor
          </option>
          <option>Helse</option>
          <option>Oppvekst</option>
          <option>Teknisk</option>
          <option>Social og Velferd</option>
          <option>Samferdsel</option>
        </select>

        {/* Same for the Fylke dropdown */}
        <select className="select select-bordered flex-1">
          <option disabled selected>
            Fylke
          </option>
          <option value="15">Møre og Romsdal</option>
          <option value="40">Telemark</option>
          <option value="34">Innlandet</option>
          <option value="33">Buskerud</option>
          <option value="46">Vestland</option>
          <option value="39">Vestfold</option>
          <option value="11">Rogaland</option>
          <option value="42">Agder</option>
          <option value="03">Oslo</option>
          <option value="31">Østfold</option>
          <option value="32">Akershus</option>
          <option value="56">Finnmark - Finnmárku - Finmarkku</option>
          <option value="55">Troms - Romsa - Tromssa</option>
          <option value="50">Trøndelag - Trööndelage</option>
          <option value="18">Nordland - Nordlánnda</option>
        </select>

        {/* Text input also allowed to expand */}
        <input
            type="text"
            placeholder="Søk"
            className="input input-bordered flex-1"
        />

        {/* Keep the buttons at their natural or fixed widths */}
        <button className="btn w-24">Søk</button>
        <button className="btn w-24">Nullstill</button>
      </div>
  );
}

export default Filter;
