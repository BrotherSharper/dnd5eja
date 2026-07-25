export function journalEntryFullById(entity, translation) {
    if (!translation) return entity;

    // Entry name
    if (typeof translation.name === "string") entity.name = translation.name;

    // Normaliza pages a un iterable
    const pages = (() => {
        const p = entity?.pages;
        if (!p) return [];

        // Foundry Collection (iterable)
        if (typeof p[Symbol.iterator] === "function") return p;

        // EmbeddedCollection-like
        if (Array.isArray(p?.contents)) return p.contents;

        // Array
        if (Array.isArray(p)) return p;

        // Objeto indexado
        if (typeof p === "object") return Object.values(p);

        return [];
    })();

    const tPages = translation.pages ?? {};

    for (const page of pages) {
        const pageId = page?._id ?? page?.id;
        if (!pageId) continue;

        const tPage = tPages[pageId];
        if (!tPage) continue;

        // Page name
        if (typeof tPage.name === "string") page.name = tPage.name;

        // TEXT: soporta text string o text.content
        const textContent =
            (typeof tPage.text === "string") ? tPage.text :
                (tPage.text?.content !== undefined) ? tPage.text.content :
                    undefined;

        if (textContent !== undefined) {
            // 1) Página con text legacy como string
            if (typeof page.text === "string") {
                page.text = textContent;
            }
            // 2) Página con text como objeto {format, content}
            else {
                page.text = page.text ?? {};
                if (typeof page.text === "object") {
                    page.text.content = textContent;
                    if (page.text.format === undefined) page.text.format = 1; // 1 = HTML en JournalEntryPage
                }
            }

            // 3) Compat: algunos renders leen system.text.content
            page.system = page.system ?? {};
            page.system.text = page.system.text ?? {};
            if (typeof page.system.text === "object") page.system.text.content = textContent;
        }

        // DESCRIPTION: soporta string o description.value
        const descValue =
            (typeof tPage.description === "string") ? tPage.description :
                (tPage.description?.value !== undefined) ? tPage.description.value :
                    undefined;

        if (descValue !== undefined) {
            page.system = page.system ?? {};
            page.system.description = page.system.description ?? {};
            if (typeof page.system.description === "object") page.system.description.value = descValue;
        }

        // subclassHeader
        if (tPage.subclassHeader !== undefined) {
            page.system = page.system ?? {};
            page.system.subclassHeader = tPage.subclassHeader;
        }

        // subclass (campo suelto o description.subclass)
        const subclassValue =
            (typeof tPage.subclass === "string") ? tPage.subclass :
                (tPage.description?.subclass !== undefined) ? tPage.description.subclass :
                    undefined;

        if (subclassValue !== undefined) {
            page.system = page.system ?? {};
            page.system.description = page.system.description ?? {};
            if (typeof page.system.description === "object") page.system.description.subclass = subclassValue;
        }
    }

    return entity;
}
