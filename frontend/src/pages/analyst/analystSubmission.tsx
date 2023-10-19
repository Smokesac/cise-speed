import { FormEvent, useState } from "react";
import formStyles from "../../../styles/Form.module.scss";
import { useRouter } from 'next/router';
import { URL } from "../../components/URLs";
import axios from "axios";

const NewDiscussion = () => {

    const router = useRouter();

    // Retrieve query parameters from the router object
    const { ptitle, pauthors, psource, ppubyear, pdoi, pclaim, pevidence } = router.query;


    const [title, setTitle] = useState(ptitle);
    const [authors, setAuthors] = useState<string[]>([]);
    const [journal, setJournal] = useState(psource);
    const [publicationYear, setPublicationYear] = useState<number>(0);
    const [volume, setVolume] = useState<number>(0);
    const [numberPages, setNumberPages] = useState<number>(0);
    const [doi, setDoi] = useState(pdoi);
    const [sEPractice, setSePractice] = useState("");
    const [claim, setClaim] = useState("");
    const [researchType, setResearchType] = useState("");
    const [participantType, setParticipantType] = useState("");
    const [evidenceResult, setEvidenceResult] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [summary, setSummary] = useState("");

    const [submissionStatus, setSubmissionStatus] = useState("");
    const [missingFields, setMissingFields] = useState<string[]>([]);

    const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const requiredFields = ["title"];
        const missing = requiredFields.filter(field => !eval(field));

        if (missing.length > 0) {
            setSubmissionStatus("fail");
            setMissingFields(missing);
            return;
        } else {
            try {
                const response = await axios.post(URL.url + "/articles", {
                    title,
                    authors,
                    journal,
                    publicationYear,
                    volume,
                    numberPages,
                    doi,
                    sEPractice,
                    claim,
                    researchType,
                    participantType,
                    evidenceResult,
                    tags,
                    summary,
                })
            } catch (error) {
                console.error("error", error);
                setSubmissionStatus("fail");
            }
        }
        setSubmissionStatus("success");
    };


    const addAuthor = () => {
        setAuthors(authors.concat([""]));
    };

    const removeAuthor = (index: number) => {
        setAuthors(authors.filter((_, i) => i !== index));
    };

    const changeAuthor = (index: number, value: string) => {
        setAuthors(
            authors.map((oldValue, i) => {
                return index === i ? value : oldValue;
            })
        );
    };

    // Return the full form
    return (
        <div className="container">
            <h1>New Article</h1>

            {submissionStatus === "fail" && (
                <div>
                    <p style={{ color: "red" }}>Please fill in the following fields:</p>
                    <ul>
                        {missingFields.map((field, index) => (
                            <li key={index}>{field}</li>
                        ))}
                    </ul>
                </div>
            )}

            {submissionStatus === "success" && (
                <p style={{ color: "green" }}>Article submitted successfully!</p>
            )}



            <form className={formStyles.form} onSubmit={submitNewArticle}>
                <label htmlFor="title">Title:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(event) => {
                        setTitle(event.target.value);
                    }}
                />

                <label htmlFor="author">Authors:</label>
                {authors.map((author, index) => {
                    return (
                        <div key={`author ${index}`} className={formStyles.arrayItem}>
                            <input
                                type="text"
                                name="author"
                                value={author}
                                onChange={(event) => changeAuthor(index, event.target.value)}
                                className={formStyles.formItem}
                            />
                            <button
                                onClick={() => removeAuthor(index)}
                                className={formStyles.buttonItem}
                                style={{ marginLeft: "3rem" }}
                                type="button"
                            >
                                -
                            </button>
                        </div>
                    );
                })}
                <button
                    onClick={() => addAuthor()}
                    className={formStyles.buttonItem}
                    style={{ marginLeft: "auto" }}
                    type="button"
                >
                    +
                </button>

                <label htmlFor="journal">Journal:</label>
                <input
                    className="text"
                    name="journal"
                    id="journal"
                    value={journal}
                    onChange={(event) => setJournal(event.target.value)}
                    required
                />

                <label htmlFor="publicationYear">Publication Year:</label>
                <input
                    className={formStyles.formItem}
                    type="number"
                    name="publicationYear"
                    id="publicationYear"
                    value={publicationYear}
                    onChange={(event) => {
                        const val = event.target.value;
                        if (val === "") {
                            setPublicationYear(0);
                        } else {
                            setPublicationYear(parseInt(val));
                        }
                    }}
                />

                <label htmlFor="volume">Volumes</label>
                <input
                    className="number"
                    name="volume"
                    id="volume"
                    value={volume}
                    onChange={(event) => {
                        const val = event.target.value;
                        if (val === "") {
                            setVolume(0);
                        } else {
                            setVolume(parseInt(val));
                        }
                    }}
                />

                <label htmlFor="numberPages">No. of pages</label>
                <input
                    className="number"
                    name="numberPages"
                    id="numberPages"
                    value={volume}
                    onChange={(event) => {
                        const val = event.target.value;
                        if (val === "") {
                            setNumberPages(0);
                        } else {
                            setNumberPages(parseInt(val));
                        }
                    }}
                />

                <label htmlFor="DOI">DOI:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="DOI"
                    id="DOI"
                    value={doi}
                    onChange={(event) => setDoi(event.target.value)}
                    required
                />

                <label htmlFor="sEPractice">SE Practice:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="sEPractice"
                    id="sEPractice"
                    value={sEPractice}
                    onChange={(event) => setSePractice(event.target.value)}
                    required
                />

                <label htmlFor="claim">Claim:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="claim"
                    id="claim"
                    value={claim}
                    onChange={(event) => setClaim(event.target.value)}
                    required
                />

                <label htmlFor="researchType">Research Type:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="researchType"
                    id="researchType"
                    value={researchType}
                    onChange={(event) => setResearchType(event.target.value)}
                    required
                />

                <label htmlFor="participantType">Participant Type:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="participantType"
                    id="participantType"
                    value={participantType}
                    onChange={(event) => setParticipantType(event.target.value)}
                    required
                />

                <label htmlFor="evidenceResult">Evidence Result:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="evidenceResult"
                    id="evidenceResult"
                    value={evidenceResult}
                    onChange={(event) => setEvidenceResult(event.target.value)}
                    required
                />

                <label htmlFor="tags">Tags:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="tags"
                    id="tags"
                    value={tags.join(", ")} // Assuming tags is an array
                    onChange={(event) => setTags(event.target.value.split(", ").map(tag => tag.trim()))}
                    required
                />

                <label htmlFor="summary">Summary:</label>
                <textarea
                    className={formStyles.formTextArea}
                    name="summary"
                    value={summary}
                    onChange={(event) => setSummary(event.target.value)}
                    required
                />


                <button className={formStyles.formItem} type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};


export default NewDiscussion;