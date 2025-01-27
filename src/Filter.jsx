function Filter() {
    return (
        <>
            <div className="flex justify-evenly">
                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Sektor</option>
                    <option>Helse</option>
                    <option>Oppvekst</option>
                    <option>Teknisk</option>
                    <option>Social og Velfred</option>
                    <option>Samfredsel</option>
                </select>
                <select className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Fylke</option>
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
                <input type="text" placeholder="Søk" className="input input-bordered w-full max-w-xs" />
                <button className="btn">Nullstill</button>
                </div>
        </>
    );
}

export default Filter;
