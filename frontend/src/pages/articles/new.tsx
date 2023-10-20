import React, { FormEvent, useState } from "react";
import axios from "axios";
import formStyles from "../../../styles/Form.module.scss";
import { URL } from "../../components/URLs";

const NewDiscussion = () => {
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState<string[]>([]);
    const [journal, setJournal] = useState("");
    const [volume, setVolume] = useState("");
    const [numberPages, setNumberPages] = useState<number>(0);
    const [publicationYear, setPublicationYear] = useState<number>(0);
    const [doi, setDoi] = useState("");
    const [submitterId, setSubmitterId] = useState("");
    
    const [submissionStatus, setSubmissionStatus] = useState("");
    const [missingFields, setMissingFields] = useState<string[]>([]);

    const submitNewArticle = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validate fields
        const requiredFields = ["title", "authors", "journal", "volume", "numberPages", "publicationYear", "doi", "submitterId"];
        const invalidFields = requiredFields.filter(field => !eval(field));

        if (invalidFields.length > 0) {
            setSubmissionStatus("fail");
            setMissingFields(invalidFields);
        } else {
            try {
                // Send a POST request to your API endpoint
                const response = await axios.post(URL.url + "/modArticles", {
                    title,
                    authors,
                    journal,
                    volume,
                    numberPages,
                    publicationYear,
                    doi,
                    submitterId,
                });

                
            } catch (error) {
                console.error("Error:", error);
                setSubmissionStatus("fail");
            }
        }
    };

    const addAuthor = () => {
        // Add an empty string to the authors array
        setAuthors([...authors, ""]);
    };

    const changeAuthor = (index: number, value: string) => {
        // Update the authors array with the modified value at the given index
        setAuthors(authors.map((oldValue, i) => (i === index ? value : oldValue)));
    };

    return (
        <div className="container">
            <h1>New Article</h1>

            <form className={formStyles.form} onSubmit={submitNewArticle}>
                <label htmlFor="title">Title:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required
                />

<label htmlFor="authors">Authors:</label>
                {authors.map((author, index) => (
                    <div key={`author-${index}`} className={formStyles.arrayItem}>
                        <input
                            type="text"
                            name={`author-${index}`}
                            value={author}
                            onChange={(event) => changeAuthor(index, event.target.value)}
                            className={formStyles.formItem}
                            required
                        />
                        {index > 0 && ( // Show remove button for additional authors
                            <button
                                onClick={() => setAuthors(authors.filter((_, i) => i !== index))}
                                className={formStyles.removeAuthorButton}
                                type="button"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
                <button onClick={addAuthor} className={formStyles.authorButton} type="button">
                    Add Author
                </button>

                <label htmlFor="journal">Journal:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="journal"
                    id="journal"
                    value={journal}
                    onChange={(event) => setJournal(event.target.value)}
                    required
                />

                <label htmlFor="volume">Volume:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="volume"
                    id="volume"
                    value={volume}
                    onChange={(event) => setVolume(event.target.value)}
                    required
                />

                <label htmlFor="numberPages">Number of Pages:</label>
                <input
                    className={formStyles.formItem}
                    type="number"
                    name="numberPages"
                    id="numberPages"
                    value={numberPages}
                    onChange={(event) => setNumberPages(parseInt(event.target.value))}
                    required
                />

                <label htmlFor="publicationYear">Publication Year:</label>
                <input
                    className={formStyles.formItem}
                    type="number"
                    name="publicationYear"
                    id="publicationYear"
                    value={publicationYear}
                    onChange={(event) => setPublicationYear(parseInt(event.target.value))}
                    required
                />

                <label htmlFor="doi">DOI:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="doi"
                    id="doi"
                    value={doi}
                    onChange={(event) => setDoi(event.target.value)}
                    required
                />

                <label htmlFor="submitterId">Submitter ID:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="submitterId"
                    id="submitterId"
                    value={submitterId}
                    onChange={(event) => setSubmitterId(event.target.value)}
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
